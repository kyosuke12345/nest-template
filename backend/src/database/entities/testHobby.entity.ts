import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestUserHobby } from './testUserHobby.entity';

export const MAX_LENGHT = {
  TITLE: 30,
} as const;

@Entity('test_hobby')
export class TestHobby {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    name: 'title',
    length: MAX_LENGHT.TITLE,
  })
  title: string;

  /** 多対多 */
  @OneToMany(() => TestUserHobby, (userHobby) => userHobby.hobby)
  userHobbies: TestUserHobby[];
}
