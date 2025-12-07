import { MigrationInterface, QueryRunner } from 'typeorm';

export class Region1764981313869 implements MigrationInterface {
  name = 'Region1764981313869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "region" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "region" ADD CONSTRAINT "UQ_8d766fc1d4d2e72ecd5f6567a02" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "region" ADD "name_en" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "region" ADD "code" character varying`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8d766fc1d4d2e72ecd5f6567a0" ON "region" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8d766fc1d4d2e72ecd5f6567a0"`,
    );
    await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "name_en"`);
    await queryRunner.query(
      `ALTER TABLE "region" DROP CONSTRAINT "UQ_8d766fc1d4d2e72ecd5f6567a02"`,
    );
    await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "name"`);
  }
}
