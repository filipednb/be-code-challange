import  DBConnector from '../../db/database.connector'
import { OrganizationModel } from '../organization/organization.model';
import { OrganizationQueries as queries } from '../organization/organization.queries';

class OrganizationRepository {

  private db: DBConnector = DBConnector.getInstance();

  public async findAll() {
    return await this.db.execute<OrganizationModel[]>(queries.findAll, []);
  }

  public async findByCode(codes: string[]) {
    return await this.db.execute<OrganizationModel[]>(queries.findByCode, [codes]);
  }

  public async findById(id: string) {
    return await this.db.execute<OrganizationModel>(queries.findById, id);
  }

  public async upSert(id: string, code: string, type: string) {
    return await this.db.execute<OrganizationModel>(queries.upSert, [id, code, type, code, type]);
  }
}

export default OrganizationRepository