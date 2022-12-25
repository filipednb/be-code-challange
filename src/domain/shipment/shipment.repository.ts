import { execute, beginTransaction, commit, rollback } from '../../db/mysql.connector';
import { ShipmentQueries as queries } from './shipment.queries';
import { ShipmentModel } from './shipment.model';
import { ResultSetHeader } from 'mysql2';
import { Logger } from 'tslog';

class ShipmentRepository {

  private log: Logger<ShipmentRepository> = new Logger();

  public async findAll() {
    this.log.info(`M=findAll, I=Find all shipment`)
    return await execute<ShipmentModel[]>(queries.findAll, []);
  }

  public async findByReferenceId(referenceId: string) {
    this.log.info(`M=findByReferenceId, I=Find shipment by referenceId=${referenceId}`)
    return await execute<ShipmentModel[]>(queries.findByReferenceId, [referenceId]);
  }

  public async upSert( 
    type: string,
    referenceId: string,
    organizationIds: string[],
    estimatedTimeArrival: string,
    weight: number,
    weightUnit: string
  ) {
    this.log.info(`M=upSert, I=Updating or inserting shipment, referenceId=${referenceId}`)
    await beginTransaction();
    try {
      
      const resultShipment = await execute<ResultSetHeader>(queries.upSert, [
        type, referenceId, estimatedTimeArrival, weight, weightUnit, estimatedTimeArrival, weight, weightUnit,
      ]);
      const shipmentId = resultShipment.insertId;

      if(organizationIds.length > 0) {
        await this.insertShipmentOrganizationJunction(organizationIds, shipmentId);
      }

      await commit();

    } catch (error) {
      await rollback();
      this.log.error(`M=upSert, E=Error on shipment update, referenceId=${referenceId}`)
    }

  }


  private async insertShipmentOrganizationJunction(organizationIds: string[], shipmentId: number) {
    const shipmentOrganizationRelationship = organizationIds.map(orgId => {
      return [orgId, shipmentId];
    });

    await execute<ResultSetHeader>(queries.insertRelationship, [shipmentOrganizationRelationship]);
  }
}

export default ShipmentRepository