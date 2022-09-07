import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662500389637 implements MigrationInterface {
    name = 'initialMigration1662500389637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "capacity" ("id" uuid NOT NULL, "rooms" integer NOT NULL, "beds" integer NOT NULL, "totalGuests" integer NOT NULL DEFAULT '1', "bathrooms" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_c87ed22152323f83d46ad2c78bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "username" character varying(20) NOT NULL, "email" character varying(30) NOT NULL, "password" character varying(50) NOT NULL, "dateOfBirth" character varying(10) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "photo" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accommodations" ("id" uuid NOT NULL, "name" character varying(35) NOT NULL, "description" character varying(200) NOT NULL, "dailyPrice" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "verifiedByAdm" boolean NOT NULL DEFAULT false, "specialOffer" boolean NOT NULL DEFAULT false, "typeId" uuid, "ownerId" uuid, "capacityId" uuid, "categoryId" uuid, CONSTRAINT "PK_a422a200297f93cd5ac87d049e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL, "checkIn" character varying(10) NOT NULL, "checkOut" character varying(10) NOT NULL, "status" character varying(10) NOT NULL DEFAULT 'booked', "accommodationId" uuid, "userId" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL, "country" character varying(50) NOT NULL, "state" character varying(50) NOT NULL, "city" character varying(70) NOT NULL, "postalCode" character varying(50) NOT NULL, "street" character varying(100) NOT NULL, "complement" character varying(50), "accommodationId" uuid, CONSTRAINT "REL_e48a6136dc2b6b282c5fdfa6ec" UNIQUE ("accommodationId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL, "content" character varying NOT NULL, "accommodationId" uuid, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accommodations" ADD CONSTRAINT "FK_ccac6c847c67496bbf2a15f328f" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accommodations" ADD CONSTRAINT "FK_024b299747b2749adfdd8f84cb3" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accommodations" ADD CONSTRAINT "FK_38aa2667d91e51dd3e0a9fc7716" FOREIGN KEY ("capacityId") REFERENCES "capacity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accommodations" ADD CONSTRAINT "FK_2180d8b543f437b5639ef31b3b2" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_2592ba9cbd991de9cb199295bc9" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_e48a6136dc2b6b282c5fdfa6ec2" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_405a1bbc9e1ea9aa5a96cad5d96" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_405a1bbc9e1ea9aa5a96cad5d96"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_e48a6136dc2b6b282c5fdfa6ec2"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_2592ba9cbd991de9cb199295bc9"`);
        await queryRunner.query(`ALTER TABLE "accommodations" DROP CONSTRAINT "FK_2180d8b543f437b5639ef31b3b2"`);
        await queryRunner.query(`ALTER TABLE "accommodations" DROP CONSTRAINT "FK_38aa2667d91e51dd3e0a9fc7716"`);
        await queryRunner.query(`ALTER TABLE "accommodations" DROP CONSTRAINT "FK_024b299747b2749adfdd8f84cb3"`);
        await queryRunner.query(`ALTER TABLE "accommodations" DROP CONSTRAINT "FK_ccac6c847c67496bbf2a15f328f"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "accommodations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "types"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "capacity"`);
    }

}
