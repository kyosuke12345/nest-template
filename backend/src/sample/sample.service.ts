import { Injectable, NotFoundException } from '@nestjs/common';
import { TestUser } from 'src/database/entities/testUser.entity';
import { Repository } from 'typeorm';
import { SampleRegistDto, SampleUpdateDto } from './class/sample.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(TestUser)
    private readonly testUserRepository: Repository<TestUser>,
  ) {}

  async list(): Promise<TestUser[]> {
    return this.testUserRepository.find({ order: { id: 'ASC' } });
  }

  async detail(id: number): Promise<TestUser> {
    const user = await this.testUserRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }
    return user;
  }

  async register(body: SampleRegistDto): Promise<TestUser> {
    const newUser = await this.testUserRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });

    await this.testUserRepository.save(newUser);
    return newUser;
  }

  async update(body: SampleUpdateDto): Promise<TestUser> {
    let user = await this.testUserRepository.findOne({ id: body.id });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${body.id}`);
    }
    body.password = await bcrypt.hash(body.password, 10);
    user = { ...body };
    await this.testUserRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<TestUser> {
    const user = await this.testUserRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }

    return await this.testUserRepository.remove(user);
  }
}
