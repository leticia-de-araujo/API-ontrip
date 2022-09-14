import { MigrationInterface, QueryRunner } from "typeorm";

export class listUsers1662664889184 implements MigrationInterface {
    name = 'listUsers1662664889184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accommodations" ALTER COLUMN "dailyPrice" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accommodations" ALTER COLUMN "dailyPrice" TYPE double precision`);
    }

}
