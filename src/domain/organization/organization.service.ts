import { OrganizationModel } from "./organization.model";
import OrganizationRepository from "./organization.repository";

class OrganizationService {

    private repo: OrganizationRepository;

    constructor() {
        this.repo = new OrganizationRepository();
    }

    public async findAll() {
        const orgs: OrganizationModel[] = await this.repo.findAll();
        return orgs; 
    }

    public async findByCode(codes: string[]) {
        const orgs: OrganizationModel[] = await this.repo.findByCode(codes);
        return orgs;
    }

    public async updateOrInsert(payload: OrganizationModel) {
        await this.repo.upSert(payload.id, payload.code, payload.type);
    }

    public async findById(id: string) {
        const org: OrganizationModel = await this.repo.findById(id);
        return org;
    }
}

export default OrganizationService;