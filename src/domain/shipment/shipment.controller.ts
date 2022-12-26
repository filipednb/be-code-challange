import express, { Request, Response} from 'express';
import { ShipmentRequest } from '../shipment/shipment.model';
import ShipmentService  from '../shipment/shipment.service';
import ShipmentMapper from '../shipment/shipment.mapper'
import { Logger } from "tslog";

 
class ShipmentController {
  private log: Logger<ShipmentController> = new Logger();
  private service: ShipmentService = new ShipmentService();
  private pathSingular = '/shipment';
  private pathPlural = '/shipments';
  private router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.pathSingular, this.getAll);
    this.router.post(this.pathSingular, this.insertOrUpdate);
    this.router.get(`${this.pathPlural}/:referenceId`, this.findByReferenceId)
    this.router.get(`${this.pathSingular}/weight`, this.calculateTotalWeight)
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

  insertOrUpdate = async (req: Request<never, never , ShipmentRequest>, res: Response) => {
    this.log.info(`M=insertOrUpdate, I=Inserting or updating shipment,` +
    ` req=${JSON.stringify(req.body)}`)
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
      this.log.error(`M=insertOrUpdate, E=Error on shipment insertion, ` +
      `req=${JSON.stringify(req.body)}, err=${error}`)
      res.status(400).send(error)
    }
  }

  findByReferenceId = async (req: Request, res: Response) => {
    this.log.info(`M=findByReferenceId, I=Find shipment by ` +
    `referenceId=${req.params.referenceId}`);
    try {
      const response = await this.service.findByReferenceId(req.params.referenceId);
      res.send(ShipmentMapper.toResponse(response));
    } catch (error) {
      this.log.error(`M=findByReferenceId, E=Error on findByReferenceId, ` +
      `req=${JSON.stringify(req.params.referenceId)}, err=${error}`)
      res.status(404).send(error);
    }
  }

  calculateTotalWeight = async (req: Request<{unit: string}>, res: Response) => {
    this.log.info(`M=calculateTotalWeight, I=Calculates total weight ` +
    `weightUnit=${req.query.unit}`);
    try {
      if (typeof req.query.unit === "string") {
        res.json(await this.service.calculateTotalWeight(req.query.unit));
      } else {
        res.status(400).send('Missing weight unit');
      }
    } catch (error) {
      (`M=calculateTotalWeight, E=Error on calculateTotalWeight, ` +
      `req=${JSON.stringify(req.query)}, err=${error}`)
      res.status(404).send(error);
    }
  }
}

export default ShipmentController;