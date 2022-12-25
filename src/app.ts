import express from 'express';
import bodyParser from 'body-parser';
import * as dbConnector from '../src/db/mysql.connector';


class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);  
    this.initializeDB();
  }

  private initializeDB() {
    dbConnector.init();
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
      console.log(`Server listening - Port: ${this.port}`);
    });
  }
}

export default App;