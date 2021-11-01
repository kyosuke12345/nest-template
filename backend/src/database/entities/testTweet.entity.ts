import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestUser } from './testUser.entity';

export const MAX_LENGTH = {
  COMMENT: 128,
} as const;

@Entity('test_tweet')
export class TestTweet {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'test_user_id' })
  testUserId: number;

  @Column({ name: 'comment', type: 'varchar', length: MAX_LENGTH.COMMENT })
  comment: string;

  @ManyToOne(() => TestUser, (user) => user.tweets)
  @JoinColumn({ name: 'test_user_id', referencedColumnName: 'id' })
  user: TestUser;
}
