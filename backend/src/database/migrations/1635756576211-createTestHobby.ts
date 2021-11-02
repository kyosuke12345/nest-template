import {MigrationInterface, QueryRunner} from "typeorm";

export class createTestHobby1635756576211 implements MigrationInterface {
    name = 'createTestHobby1635756576211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_hobby" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, CONSTRAINT "PK_f1e143210727307847d5365daa6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "test_hobby" (title) values ('野球')`);
        await queryRunner.query(`INSERT INTO "test_hobby" (title) values ('サッカー')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test_hobby"`);
    }

}
