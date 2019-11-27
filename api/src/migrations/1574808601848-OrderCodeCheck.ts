import {MigrationInterface, QueryRunner} from "typeorm";

/**
 * Adds unique index to condionally check order codes are unique per machine
 */
export class OrderCodeCheck1574808601848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      // 'CREATE INDEX MACHINE_EARTH_LOC_INDEX on machine USING gist(ll_to_earth(latitude, longitude));'
      return queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS ORDER_CODE_UNIQUE_IF_NOT_FINISHED ON "order" ("code", "machineId") WHERE ("finished" = FALSE);`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query("DROP INDEX ORDER_CODE_UNIQUE_IF_NOT_FINISHED;");
    }

}
