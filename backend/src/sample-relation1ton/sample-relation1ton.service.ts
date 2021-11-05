import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestTweet } from 'src/database/entities/testTweet.entity';
import { TestUser } from 'src/database/entities/testUser.entity';
import { Connection, Repository } from 'typeorm';
import {
  SampleRelation1toNRegisterDto,
  SampleRelation1toNUpdateDto,
} from './class/sample-relation1ton.dto';
import { SampleRelation1toNResponse } from './class/sample-relation1ton.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SampleRelation1tonService {
  constructor(
    @InjectRepository(TestUser)
    private readonly userRepository: Repository<TestUser>,
    @InjectRepository(TestTweet)
    private readonly tweetRepository: Repository<TestTweet>,
    private readonly connection: Connection,
  ) {}

  /**
   * 一覧取得
   * @returns
   */
  async list(): Promise<SampleRelation1toNResponse[]> {
    const list = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tweets', 'tweet')
      .orderBy('user.id', 'ASC')
      .addOrderBy('tweet.id', 'ASC')
      .getMany();
    return list.map((item) => new SampleRelation1toNResponse(item));
  }

  /**
   * 詳細取得
   * @param id
   */
  async detail(id: number): Promise<SampleRelation1toNResponse> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tweets', 'tweet')
      .orderBy('user.id', 'ASC')
      .addOrderBy('tweet.id', 'ASC')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }
    return new SampleRelation1toNResponse(user);
  }

  /**
   * 登録
   * @param body
   * @returns
   */
  async register(
    body: SampleRelation1toNRegisterDto,
  ): Promise<SampleRelation1toNResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { comments, password, ...restBody } = body;
      const newUser = await this.userRepository.create({
        ...restBody,
        password: await bcrypt.hash(password, 10),
      });
      await queryRunner.manager.save(newUser);

      if (comments && comments.length > 0) {
        newUser.tweets = [];
        for (const comment of comments) {
          const newTweet = await this.tweetRepository.create({
            comment: comment,
            testUserId: newUser.id,
          });
          await queryRunner.manager.save(newTweet);
          newUser.tweets.push(newTweet);
        }
      }

      await queryRunner.commitTransaction();
      return new SampleRelation1toNResponse(newUser);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 更新処理
   * @param body
   * @returns
   */
  async update(
    body: SampleRelation1toNUpdateDto,
  ): Promise<SampleRelation1toNResponse> {
    const tweet = await this.tweetRepository.findOne({
      relations: ['user'],
      where: { id: body.tweetId },
    });
    if (!tweet) {
      throw new NotFoundException(
        `TestTweet does not exists 'id': ${body.tweetId}`,
      );
    }

    tweet.comment = body.comment;
    await this.tweetRepository.save(tweet);

    return this.detail(tweet.user.id);
  }

  /**
   * 削除処理
   * @param id
   * @returns
   */
  async delete(id: number): Promise<Omit<SampleRelation1toNResponse, 'id'>> {
    const user = await this.userRepository.findOne({
      relations: ['tweets'],
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 参照元から削除
      if (user.tweets && user.tweets.length > 0) {
        await queryRunner.manager.remove(user.tweets);
      }
      await queryRunner.manager.remove(user);
      await queryRunner.commitTransaction();
      return new SampleRelation1toNResponse(user);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
