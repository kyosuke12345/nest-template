import {MigrationInterface, QueryRunner} from "typeorm";

export class createTestUserHobby1635757052206 implements MigrationInterface {
    name = 'createTestUserHobby1635757052206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_user_hobby" ("id" SERIAL NOT NULL, "test_user_id" integer NOT NULL, "test_hobby_id" integer NOT NULL, CONSTRAINT "PK_a6315f5551b1adc003692c34a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "test_user_hobby" ADD CONSTRAINT "FK_af5f6933a4e863e897d999d0385" FOREIGN KEY ("test_user_id") REFERENCES "test_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_user_hobby" ADD CONSTRAINT "FK_609f7884fe08d6e66614b93f089" FOREIGN KEY ("test_hobby_id") REFERENCES "test_hobby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_user_hobby" DROP CONSTRAINT "FK_609f7884fe08d6e66614b93f089"`);
        await queryRunner.query(`ALTER TABLE "test_user_hobby" DROP CONSTRAINT "FK_af5f6933a4e863e897d999d0385"`);
        await queryRunner.query(`DROP TABLE "test_user_hobby"`);
    }

}
