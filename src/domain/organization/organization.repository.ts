import { execute } from '../../db/mysql.connector';
import { OrganizationModel } from './organization.model';
import { OrganizationQueries as queries } from './organization.queries';

class OrganizationRepository {

  public async findAll() {
    return await execute<OrganizationModel[]>(queries.findAll, []);
  }

  public async findByCode(codes: string[]) {
    return await execute<OrganizationModel[]>(queries.findByCode, [codes]);
  }

  public async findById(id: string) {
    return await execute<OrganizationModel>(queries.findById, id);
  }

  public async upSert(id: string, code: string, type: string) {
    return await execute<OrganizationModel>(queries.upSert, [id, code, type, code, type]);
  }

}

export default OrganizationRepository