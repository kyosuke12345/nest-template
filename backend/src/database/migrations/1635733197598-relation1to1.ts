import {MigrationInterface, QueryRunner} from "typeorm";

export class relation1to11635733197598 implements MigrationInterface {
    name = 'relation1to11635733197598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_profile" ("id" SERIAL NOT NULL, "gender" character varying(1) NOT NULL, CONSTRAINT "PK_786d1621e197e7cf2a7ef6217b6" PRIMARY KEY ("id")); COMMENT ON COLUMN "test_profile"."gender" IS '性別'`);
        await queryRunner.query(`ALTER TABLE "test_user" ADD "profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "test_user" ADD CONSTRAINT "UQ_a41cf9e685921d2d61382d0d2c1" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "test_user" ADD CONSTRAINT "FK_a41cf9e685921d2d61382d0d2c1" FOREIGN KEY ("profile_id") REFERENCES "test_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_user" DROP CONSTRAINT "FK_a41cf9e685921d2d61382d0d2c1"`);
        await queryRunner.query(`ALTER TABLE "test_user" DROP CONSTRAINT "UQ_a41cf9e685921d2d61382d0d2c1"`);
        await queryRunner.query(`ALTER TABLE "test_user" DROP COLUMN "profile_id"`);
        await queryRunner.query(`DROP TABLE "test_profile"`);
    }

}
