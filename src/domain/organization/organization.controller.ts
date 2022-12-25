import express, { Request, Response } from 'express';
import { OrganizationModel } from './organization.model';
import OrganizationService  from './organization.service';
import { Logger } from 'tslog';
 
class OrganizationController {
    private log: Logger<OrganizationController> = new Logger();
    public pathSingular = '/organization';
    public pathPlural = '/organizations'
    public router = express.Router();
    private service: OrganizationService;

    constructor() {
      this.service = new OrganizationService();
      this.intializeRoutes();
    }

  public intializeRoutes() {
    this.router.get(this.pathSingular, this.getAll);
    this.router.get(`${this.pathPlural}/:id`, this.findById);
    this.router.post(this.pathSingular, this.updateOrInsert);
  }

  getAll = async (_req: Request<OrganizationModel>, res: Response) => {
    this.log.info(`M=getAll, I=Get all organizations details`);
    const response:OrganizationModel[] = await this.service.findAll();
    res.send(response);
  }

  updateOrInsert = async (req: Request, res: Response) => {
    this.log.info(`M=updateOrInsert, I=Update or insert organization, body=${req.body}`);
    try {
      await this.service.updateOrInsert(req.body);
      res.send();
    } catch (error) {
      this.log.error(`M=updateOrInsert, E=Error on update or insert ` +
        `organization, body=${req.body}, error=${error}`);
      res.status(400).send(error); 
    }
  }

  findById = async (req: Request<OrganizationModel>, res: Response) => {
    this.log.info(`M=findById, I=Find organization by id=${req.params.id}`);
    try {
      const org: OrganizationModel = await this.service.findById(req.params.id);
      res.send(org);
    } catch (error) {
      this.log.error(`M=findById, I=Find organization by id=${req.params.id}`);
      res.status(400).send(error); 
    }
  }
}

export default OrganizationController;