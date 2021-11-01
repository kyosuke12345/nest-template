import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';
import { TestUser } from 'src/database/entities/testUser.entity';
import { Connection, Repository } from 'typeorm';
import {
  SampleRelation1to1RegisterDto,
  SampleRelation1to1UpdateDto,
} from './class/sample-relation1to1.dto';
import { SampleRelation1to1Response } from './class/sample-relation1to1.response';
import * as bcrypt from 'bcrypt';
import { TestProfile } from 'src/database/entities/testProfile.entity';

@Injectable()
export class SampleRelation1to1Service {
  constructor(
    @InjectRepository(TestUser)
    private readonly userRepository: Repository<TestUser>,
    @InjectRepository(TestProfile)
    private readonly profileRepository: Repository<TestProfile>,
    private readonly logger: CustomLoggerService,
    private readonly connection: Connection,
  ) {}

  /**
   * 一覧取得
   * @returns
   */
  async list(): Promise<SampleRelation1to1Response[]> {
    const list = await this.userRepository.find({
      relations: ['testProfile'],
      order: { id: 'ASC' },
    });
    return list.map((item) => new SampleRelation1to1Response(item));
  }

  /**
   * 詳細取得
   * @param id
   */
  async detail(id: number): Promise<SampleRelation1to1Response> {
    const user = await this.userRepository.findOne({
      relations: ['testProfile'],
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }
    return new SampleRelation1to1Response(user);
  }

  /**
   * 登録
   * @param body
   * @returns
   */
  async register(
    body: SampleRelation1to1RegisterDto,
  ): Promise<SampleRelation1to1Response> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { gender, password, ...restBody } = body;
      const newUser = await this.userRepository.create({
        ...restBody,
        password: await bcrypt.hash(password, 10),
      });
      if (gender) {
        const newProfile = await this.profileRepository.create({
          gender,
        });
        await queryRunner.manager.save(newProfile);
        newUser.testProfile = newProfile;
      }

      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return new SampleRelation1to1Response(newUser);
    } catch (err) {
      this.logger.error(err);
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
    body: SampleRelation1to1UpdateDto,
  ): Promise<SampleRelation1to1Response> {
    const user = await this.userRepository.findOne({
      relations: ['testProfile'],
      where: { id: body.id },
    });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${body.id}`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      user.firstName = body.firstName;
      user.email = body.email;
      user.lastName = body.lastName;
      user.password = await bcrypt.hash(body.password, 10);
      if (body.gender) {
        if (user.testProfile) {
          user.testProfile.gender = body.gender;
          await queryRunner.manager.save(user.testProfile);
        } else {
          const newProfile = await this.profileRepository.create({
            gender: body.gender,
          });
          await queryRunner.manager.save(newProfile);
          user.testProfile = newProfile;
        }
      }

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return new SampleRelation1to1Response(user);
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * 削除処理
   * @param id
   * @returns
   */
  async delete(id: number): Promise<Omit<SampleRelation1to1Response, 'id'>> {
    const user = await this.userRepository.findOne({
      relations: ['testProfile'],
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
      await queryRunner.manager.remove(user);
      if (user.testProfile) {
        await queryRunner.manager.remove(user.testProfile);
      }
      await queryRunner.commitTransaction();
      return new SampleRelation1to1Response(user);
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
