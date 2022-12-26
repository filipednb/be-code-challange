import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';
import DBConnector from '../db/database.connector';

class App {
  private log: Logger<App> = new Logger();
  public app: Application;
  public port: number;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.port = port;

    this.initializeDB();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);  

  }

  private initializeDB() {
    DBConnector.getInstance();
  }
  
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      this.log.info(`Server listening, port: ${this.port}`)
    });
  }
}

export default App;