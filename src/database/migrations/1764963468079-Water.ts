import { MigrationInterface, QueryRunner } from 'typeorm';

export class Water1764963468079 implements MigrationInterface {
  name = 'Water1764963468079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "water" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "region" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."water_resource_type_enum" AS ENUM('lake', 'channel', 'reservoir')`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "resource_type" "public"."water_resource_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."water_water_type_enum" AS ENUM('fresh', 'salty')`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "water_type" "public"."water_water_type_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "water" ADD "fauna" boolean NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "water" ADD "passport_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "technical_condition" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "latitude" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "longitude" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD "pdf_url" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "water" ADD "priority" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "priority"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "pdf_url"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "water" DROP COLUMN "technical_condition"`,
    );
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "passport_date"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "fauna"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "water_type"`);
    await queryRunner.query(`DROP TYPE "public"."water_water_type_enum"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "resource_type"`);
    await queryRunner.query(`DROP TYPE "public"."water_resource_type_enum"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "region"`);
    await queryRunner.query(`ALTER TABLE "water" DROP COLUMN "name"`);
  }
}
