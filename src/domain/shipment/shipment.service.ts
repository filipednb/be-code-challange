import { ShipmentModel } from "./shipment.model";
import OrganizationService from "../organization/organization.service";
import ShipmentRepository from '../shipment/shipment.repository';
import { OrganizationModel } from "../organization/organization.model";
import { Logger } from "tslog";

class ShipmentService {

  private log: Logger<ShipmentService> = new Logger();
  private repository: ShipmentRepository;
  private orgService: OrganizationService;

  constructor() {
      this.repository = new ShipmentRepository();
      this.orgService = new OrganizationService();
  }


  public async findAll() {
      this.log.info(`M=findAll, I=Finding all shipments`);
      const shipments: ShipmentModel[] = await this.repository.findAll();
      return shipments;
  }

  public async findByReferenceId(referenceId: string) {
    this.log.info(`M=findByReferenceId, I=Finding by reference id, referenceId=${referenceId}`);
    const shipments: ShipmentModel[] = await this.repository.findByReferenceId(referenceId);
    if(shipments.length === 0) {
      throw new Error('Not found')
    }
    return shipments
  }

    public async insertOrUpdate(
      type: string,
      referenceId: string,
      organizationCodes: string[],
      estimatedTimeArrival: string,
      weight: number,
      weightUnit: string
    ) {
      this.log.info(`M=insertOrUpdate, I=Insert or update shipment`);
      try {
        const organizationIds = await this.getOrganizationIds(organizationCodes) || [];
        await this.repository.upSert(
          type,
          referenceId,
          organizationIds,
          estimatedTimeArrival,
          weight,
          weightUnit
        )
      } catch (error) {
        this.log.error(`M=insertOrUpdate, E=Error on insert or update shipment, error=${error}`);
      }
    }

  private async getOrganizationIds(organizationCodes: string[]) {
    this.log.info(`M=getOrganizationIds, I=Get organization ids by codes=${organizationCodes}`);
    if(organizationCodes.length > 0) {
      const orgs: OrganizationModel[] = await this.orgService.findByCode(organizationCodes);
      const organizationIds = orgs.map(org => org.id);
      return organizationIds;
    }
    return [];
  }
}

export default ShipmentService;