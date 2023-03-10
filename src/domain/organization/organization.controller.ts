import express, { NextFunction, Request, Response } from 'express';
import { OrganizationModel } from '../organization/organization.model';
import OrganizationService from '../organization/organization.service';
import { Logger } from 'tslog';
 
class OrganizationController {
  private log: Logger<OrganizationController> = new Logger();
  private service: OrganizationService = new OrganizationService();
  private pathSingular = '/organization';
  private pathPlural = '/organizations'
  private router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.pathSingular, this.getAll);
    this.router.get(`${this.pathPlural}/:id`, this.findById);
    this.router.post(this.pathSingular, this.insertOrUpdate);
  }

  getAll = async (_req: Request<OrganizationModel>, res: Response) => {
    this.log.info(`M=getAll, I=Get all organizations details`);
    const response:OrganizationModel[] = await this.service.findAll();
    res.send(response);
  }

  insertOrUpdate = async (req: Request, res: Response, next: NextFunction) => {
    this.log.info(`M=insertOrUpdate, I=Update or insert organization, body=${req.body}`);

    try {
      
      await this.service.insertOrUpdate(req.body);
      
      res.send();
    } catch (error) {
      this.log.error(`M=insertOrUpdate, E=Error on update or insert ` +
        `organization, body=${JSON.stringify(req.body)}, error=${error}`);
      
      next(error); 
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