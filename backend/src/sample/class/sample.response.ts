import { ApiProperty } from '@nestjs/swagger';
import { TestUser } from 'src/database/entities/testUser.entity';

export class SampleResponse {
  @ApiProperty()
  readonly id?: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  constructor(testUser: TestUser) {
    this.id = testUser.id;
    this.email = testUser.email;
    this.firstName = testUser.email;
    this.lastName = testUser.lastName;
  }
}
