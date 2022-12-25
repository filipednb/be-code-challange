import express, { Request, Response} from 'express';
import { ShipmentDTO } from './shipment.model';
import ShipmentService  from './shipment.service';
import ShipmentMapper from './shipment.mapper'
import { Logger } from "tslog";

 
class ShipmentController {
    private log: Logger<ShipmentController> = new Logger();
    private pathSingular = '/shipment';
    private pathPlural = '/shipments';
    private router = express.Router();
    private service: ShipmentService;

    constructor() {
      this.service = new ShipmentService();
      this.intializeRoutes();
    }

  public intializeRoutes() {
    this.router.get(this.pathSingular, this.getAll);
    this.router.post(this.pathSingular, this.insertOrUpdate);
    this.router.get(`${this.pathPlural}/:referenceId`, this.findByReferenceId)
  }

  getAll = async (_req: Request, res: Response) => {
    this.log.info(`M=getAll, I=Get all shipments`)
    try {
      const response = await this.service.findAll();
      res.send(response);
    } catch (error) {
      this.log.error(`M=getAll, E=Error on get shipments , error=${error}`);
      
      res.status(400).send(error);
    }
  }

  insertOrUpdate = async (req: Request<never, never , ShipmentDTO>, res: Response) => {
    this.log.info(`M=insertOrUpdate, I=Inserting or updating shipment, req=${JSON.stringify(req.body)}`)
    try {
      const pl = req.body;
      const response = await this.service.insertOrUpdate(
        pl.type,
        pl.referenceId,
        pl.organizations,
        pl.estimatedTimeArrival,
        pl.transportPacks.nodes[0]?.totalWeight?.weight,
        pl.transportPacks.nodes[0]?.totalWeight?.unit,
      );
      res.send(response);
    } catch (error) {
      this.log.error(`M=insertOrUpdate, E=Error on shipment insertion, req=${JSON.stringify(req.body)}, err=${error}`)
      res.status(400).send(error)
    }
  }

  findByReferenceId = async (req: Request, res: Response) => {
    try {
      const response = await this.service.findByReferenceId(req.params.referenceId);
      res.send(ShipmentMapper.toDTO(response));
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default ShipmentController;