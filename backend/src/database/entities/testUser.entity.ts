import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestProfile } from './testProfile.entity';
import { TestTweet } from './testTweet.entity';
import { TestUserHobby } from './testUserHobby.entity';

export const MAX_LENGTH = {
  EMAIL: 80,
  PASSWORD: 60,
  FIRST_NAME: 50,
  LAST_NAME: 50,
} as const;

@Entity('test_user')
export class TestUser {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'email', length: MAX_LENGTH.EMAIL, unique: true })
  email: string;

  @Column({ name: 'password', length: MAX_LENGTH.PASSWORD })
  password: string;

  @Column({ name: 'first_name', length: MAX_LENGTH.FIRST_NAME })
  firstName: string;

  @Column({ name: 'last_name', length: MAX_LENGTH.LAST_NAME })
  lastName: string;

  /** 1対1 */
  @Column({
    name: 'profile_id',
    nullable: true,
  })
  profileId: number;

  @OneToOne(() => TestProfile)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  testProfile: TestProfile | null;

  /** 1対N */
  @OneToMany(() => TestTweet, (tweet) => tweet.user)
  tweets: TestTweet[];

  /** 多対多 */
  @OneToMany(() => TestUserHobby, (userHobby) => userHobby.user)
  userHobbies: TestUserHobby[];
}
