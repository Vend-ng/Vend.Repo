import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Adds indexing for ll_to_earth lookups on machines
 */
export class MachineLocationIndex1574558462452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query("CREATE INDEX MACHINE_EARTH_LOC_INDEX on machine USING gist(ll_to_earth(latitude, longitude));");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query("DROP INDEX MACHINE_EARTH_LOC_INDEX");
    }

}
