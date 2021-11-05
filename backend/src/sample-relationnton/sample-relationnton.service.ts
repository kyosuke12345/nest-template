import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestHobby } from 'src/database/entities/testHobby.entity';
import { TestUser } from 'src/database/entities/testUser.entity';
import { TestUserHobby } from 'src/database/entities/testUserHobby.entity';
import { Connection, In, Repository } from 'typeorm';
import { SampleRelationNtoNUpdateDto } from './class/sample-relationnton.dto';
import { SampleRelationNtoNResponse } from './class/sample-relationnton.response';

@Injectable()
export class SampleRelationntonService {
  constructor(
    @InjectRepository(TestUser)
    private readonly userRepository: Repository<TestUser>,
    @InjectRepository(TestUserHobby)
    private readonly userHobbyRepository: Repository<TestUserHobby>,
    @InjectRepository(TestHobby)
    private readonly hobbyRepository: Repository<TestHobby>,
    private readonly connection: Connection,
  ) {}

  /**
   * リスト取得
   * @returns
   */
  async list(): Promise<SampleRelationNtoNResponse[]> {
    const list = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userHobbies', 'user_hobby')
      .leftJoinAndSelect('user_hobby.hobby', 'hobby')
      .orderBy('user.id', 'ASC')
      .addOrderBy('hobby.id', 'ASC')
      .getMany();

    return list.map((item) => new SampleRelationNtoNResponse(item));
  }

  /**
   * 詳細取得
   * @param id
   */
  async detail(id: number): Promise<SampleRelationNtoNResponse> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userHobbies', 'user_hobby')
      .leftJoinAndSelect('user_hobby.hobby', 'hobby')
      .orderBy('user.id', 'ASC')
      .addOrderBy('hobby.id', 'ASC')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }
    return new SampleRelationNtoNResponse(user);
  }

  /**
   * 更新処理
   * @param body
   */
  async update(
    body: SampleRelationNtoNUpdateDto,
  ): Promise<SampleRelationNtoNResponse> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'ASC')
      .where('user.id = :id', { id: body.id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${body.id}`);
    }

    const userHobbies = await this.userHobbyRepository.find({
      testUserId: body.id,
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 一旦全部削除
      if (userHobbies.length > 0) {
        await queryRunner.manager.remove(userHobbies);
      }
      // 新規登録
      const hobbies = await this.hobbyRepository.find({
        id: In(body.hobbyIds),
      });
      for (const hobby of hobbies) {
        const newData = this.userHobbyRepository.create({
          testUserId: user.id,
          testHobbyId: hobby.id,
        });
        await queryRunner.manager.save(newData);
      }
      await queryRunner.commitTransaction();
      return this.detail(body.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
