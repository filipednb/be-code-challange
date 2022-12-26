import { ShipmentQueries as queries } from '../shipment/shipment.queries';
import { ShipmentModel, ShipmentWeight } from '../shipment/shipment.model';
import { ResultSetHeader } from 'mysql2';
import { Logger } from 'tslog';
import DBConnector from  '../../db/database.connector';

class ShipmentRepository {

  private db: DBConnector = DBConnector.getInstance();
  private log: Logger<ShipmentRepository> = new Logger();

  public async findAll() {
    this.log.info(`M=findAll, I=Find all shipment`)
    return await this.db.execute<ShipmentModel[]>(queries.findAll, []);
  }

  public async findByReferenceId(referenceId: string) {
    this.log.info(`M=findByReferenceId, I=Find shipment by referenceId=${referenceId}`)
    return await this.db.execute<ShipmentModel[]>(queries.findByReferenceId, [referenceId]);
  }

  public async upSert( 
    type: string,
    referenceId: string,
    organizationIds: string[],
    estimatedTimeArrival: string,
    weight: number,
    weightUnit: string
  ): Promise<void> {
    this.log.info(`M=upSert, I=Updating or inserting shipment, referenceId=${referenceId}`)
    await this.db.beginTransaction();
    try {
      
      const resultShipment = await this.db.execute<ResultSetHeader>(queries.upSert, [
        type, referenceId, estimatedTimeArrival, weight, weightUnit, estimatedTimeArrival, weight, weightUnit,
      ]);
      const shipmentId = resultShipment.insertId;

      if(organizationIds.length > 0) {
        await this.insertShipmentOrganizationJunction(organizationIds, shipmentId);
      }

      await this.db.commit();

    } catch (error) {
      await this.db.rollback();
      this.log.error(`M=upSert, E=Error on shipment update, referenceId=${referenceId}`)
      throw error;
    }

  }

  public async getCalculatedWeights(): Promise<ShipmentWeight[]> {
    return await this.db.execute(queries.getCalculatedWeight,[]);
  }

  private async insertShipmentOrganizationJunction(
    organizationIds: string[], shipmentId: number): Promise<void> {
    
      const shipmentOrganizationRelationship = organizationIds.map(orgId => {
      return [orgId, shipmentId];
    });

    await this.db.execute<ResultSetHeader>(queries.insertRelationship,
        [shipmentOrganizationRelationship]);
  }
}

export default ShipmentRepository