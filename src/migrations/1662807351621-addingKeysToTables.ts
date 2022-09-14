import { MigrationInterface, QueryRunner } from "typeorm";

export class addingKeysToTables1662807351621 implements MigrationInterface {
    name = 'addingKeysToTables1662807351621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "capacity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "types" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "accommodations" ALTER COLUMN "dailyPrice" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accommodations" ALTER COLUMN "dailyPrice" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "types" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "capacity" DROP COLUMN "isActive"`);
    }

}
