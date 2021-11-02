import { ApiProperty } from '@nestjs/swagger';
import { TestHobby } from 'src/database/entities/testHobby.entity';
import { TestUser } from 'src/database/entities/testUser.entity';

export class HobbyItem {
  @ApiProperty()
  readonly id?: number;
  @ApiProperty()
  title: string;

  constructor(testHobby: TestHobby) {
    this.id = testHobby.id;
    this.title = testHobby.title;
  }
}

export class SampleRelationNtoNResponse {
  @ApiProperty()
  readonly id?: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    type: HobbyItem,
    isArray: true,
  })
  hobbies: HobbyItem[];

  constructor(testUser: TestUser) {
    this.id = testUser.id;
    this.email = testUser.email;
    this.firstName = testUser.firstName;
    this.lastName = testUser.lastName;
    this.hobbies =
      testUser.userHobbies?.length > 0
        ? testUser.userHobbies.map((item) => new HobbyItem(item.hobby))
        : [];
  }
}
