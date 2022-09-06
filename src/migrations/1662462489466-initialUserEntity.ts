import { MigrationInterface, QueryRunner } from "typeorm";

export class initialUserEntity1662462489466 implements MigrationInterface {
    name = 'initialUserEntity1662462489466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "username" character varying(20) NOT NULL, "email" character varying(20) NOT NULL, "password" character varying(50) NOT NULL, "dob" date NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "photo" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
