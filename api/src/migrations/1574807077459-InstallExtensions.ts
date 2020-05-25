import {MigrationInterface, QueryRunner} from "typeorm";

/**
 * Installs needed base extensions for postgres
 */
export class InstallExtensions1574807077459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE EXTENSION IF NOT EXISTS cube;
        CREATE EXTENSION IF NOT EXISTS earthdistance;
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query(`
        DROP EXTENSION IF EXISTS "uuid-ossp";
        DROP EXTENSION IF EXISTS cube;
        DROP EXTENSION IF EXISTS earthdistance;
      `);
    }

}
