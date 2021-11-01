import {MigrationInterface, QueryRunner} from "typeorm";

export class createTestTweet1635745744159 implements MigrationInterface {
    name = 'createTestTweet1635745744159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_tweet" ("id" SERIAL NOT NULL, "test_user_id" integer NOT NULL, "comment" character varying(128) NOT NULL, CONSTRAINT "PK_2cc52f278bfdb4888c8b312ac95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "test_tweet" ADD CONSTRAINT "FK_2e4f127c63ee9776c64b232ed7e" FOREIGN KEY ("test_user_id") REFERENCES "test_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_tweet" DROP CONSTRAINT "FK_2e4f127c63ee9776c64b232ed7e"`);
        await queryRunner.query(`DROP TABLE "test_tweet"`);
    }

}
