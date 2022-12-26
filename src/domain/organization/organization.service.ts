import { OrganizationModel, isValid } from "../organization/organization.model";
import OrganizationRepository from "../organization/organization.repository";
import { Logger } from 'tslog';

class OrganizationService {

  private repo: OrganizationRepository = new OrganizationRepository();
  private log: Logger<OrganizationService> = new Logger();

  public async findAll() {
    const orgs: OrganizationModel[] = await this.repo.findAll();
    return orgs; 
  }

  public async findByCode(codes: string[]) {
    const orgs: OrganizationModel[] = await this.repo.findByCode(codes);
    return orgs;
  }

  public async insertOrUpdate(payload: OrganizationModel) {
    this.log.info(`M=insertOrUpdate, I=Inserting or updating ` +
    `Organization, payload=${JSON.stringify(payload)}`);

    if(!isValid(payload)) {
      this.log.error(`Invalid payload:${JSON.stringify(payload)}`)
      throw new Error('Invalid payload')
    }
    
    await this.repo.upSert(payload.id, payload.code, payload.type);
  }

  public async findById(id: string) {
    const org: OrganizationModel = await this.repo.findById(id);
    return org;
  }
}

export default OrganizationService;