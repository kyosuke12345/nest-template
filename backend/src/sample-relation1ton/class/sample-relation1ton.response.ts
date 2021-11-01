import { ApiProperty } from '@nestjs/swagger';
import { TestTweet } from 'src/database/entities/testTweet.entity';
import { TestUser } from 'src/database/entities/testUser.entity';

export class CommentItem {
  @ApiProperty()
  readonly id?: number;
  @ApiProperty()
  comment: string;

  constructor(testTweet: TestTweet) {
    this.id = testTweet.id;
    this.comment = testTweet.comment;
  }
}

export class SampleRelation1toNResponse {
  @ApiProperty()
  readonly id?: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    type: CommentItem,
    isArray: true,
  })
  comments: CommentItem[];

  constructor(testUser: TestUser) {
    this.id = testUser.id;
    this.email = testUser.email;
    this.firstName = testUser.firstName;
    this.lastName = testUser.lastName;
    this.comments =
      testUser.tweets?.length > 0
        ? testUser.tweets.map((item) => new CommentItem(item))
        : [];
  }
}
