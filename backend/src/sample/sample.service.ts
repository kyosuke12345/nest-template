import { Injectable, NotFoundException } from '@nestjs/common';
import { TestUser } from 'src/database/entities/testUser.entity';
import { Repository } from 'typeorm';
import { SampleRegistDto, SampleUpdateDto } from './class/sample.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleResponse } from './class/sample.response';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(TestUser)
    private readonly testUserRepository: Repository<TestUser>,
  ) {}

  async list(): Promise<SampleResponse[]> {
    const list = await this.testUserRepository.find({ order: { id: 'ASC' } });
    return list.map((item) => new SampleResponse(item));
  }

  async detail(id: number): Promise<SampleResponse> {
    const user = await this.testUserRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }
    return new SampleResponse(user);
  }

  async register(body: SampleRegistDto): Promise<SampleResponse> {
    const newUser = await this.testUserRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });

    await this.testUserRepository.save(newUser);
    return new SampleResponse(newUser);
  }

  async update(body: SampleUpdateDto): Promise<SampleResponse> {
    const user = await this.testUserRepository.findOne({ id: body.id });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${body.id}`);
    }
    user.firstName = body.firstName;
    user.email = body.email;
    user.lastName = body.lastName;
    user.password = await bcrypt.hash(body.password, 10);
    await this.testUserRepository.save(user);
    return new SampleResponse(user);
  }

  async delete(id: number): Promise<Omit<SampleResponse, 'id'>> {
    const user = await this.testUserRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`TestUser does not exists 'id': ${id}`);
    }

    await this.testUserRepository.remove(user);
    return new SampleResponse(user);
  }
}
