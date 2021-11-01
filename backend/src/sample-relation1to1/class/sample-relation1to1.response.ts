import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/database/entities/testProfile.entity';
import { TestUser } from 'src/database/entities/testUser.entity';

export class SampleRelation1to1Response {
  @ApiProperty()
  readonly id?: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: `
      '0'=男性
      '1'=女性
    `,
    nullable: true,
  })
  gender: Gender | null;

  constructor(testUser: TestUser) {
    this.id = testUser.id;
    this.email = testUser.email;
    this.firstName = testUser.firstName;
    this.lastName = testUser.lastName;
    this.gender = testUser.testProfile?.gender ?? null;
  }
}
