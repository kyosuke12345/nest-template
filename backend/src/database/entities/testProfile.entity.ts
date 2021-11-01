import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** 性別 */
export enum Gender {
  Male = '0',
  FeMale = '1',
}

export const MAX_LENGTH = {
  GENDER: 1,
} as const;

@Entity('test_profile')
export class TestProfile {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    name: 'gender',
    type: 'varchar',
    length: MAX_LENGTH.GENDER,
    comment: '性別',
  })
  gender: Gender;
}
