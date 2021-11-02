import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestHobby } from './testHobby.entity';
import { TestUser } from './testUser.entity';

@Entity('test_user_hobby')
export class TestUserHobby {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'test_user_id' })
  testUserId: number;

  @Column({ name: 'test_hobby_id' })
  testHobbyId: number;

  @ManyToOne(() => TestUser, (user) => user.userHobbies)
  @JoinColumn({ name: 'test_user_id', referencedColumnName: 'id' })
  user: TestUser;

  @ManyToOne(() => TestHobby, (hobby) => hobby.userHobbies)
  @JoinColumn({ name: 'test_hobby_id', referencedColumnName: 'id' })
  hobby: TestHobby;
}
