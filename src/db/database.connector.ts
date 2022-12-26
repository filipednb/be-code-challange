import { createPool, Pool} from 'mysql2';
import { source } from './config';
import { Logger } from 'tslog';

class DBConnector {
  private pool: Pool;
  private log: Logger<unknown> = new Logger();
  private static instance: DBConnector;

  private constructor() {
    this.init();
  }

  public static getInstance(): DBConnector {
    if(this.instance == null) {
      this.instance = new DBConnector();
    }
    return this.instance;
  }

  public init() {
    try {
      this.pool = createPool({
        host: source.DB_HOST,
        user: source.DB_USER,
        password: source.DB_PASSWORD,
        database: source.DB_DATABASE,
      });
      this.log.info('Pool generated successfully');
    } catch (error) {
      this.log.error(error);
      throw new Error('Failed to initialized pool');
    }
  }
  
  
  public async execute <T>(query: string, params: string[] | unknown): Promise<T> {
    try {
      if (this.pool != undefined && !this.pool) throw new Error('Unable to find pool');
  
      return new Promise<T>((resolve, reject) => {
        this.pool.query(query, params, (error, results: any) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error) {
      this.log.error(`Unable to  MySQL query: error=${error}`);
      throw new Error('Failed to execute MySQL query');
    }
  }
  
  public async beginTransaction <T>(): Promise<T> {
    return this.execute('START TRANSACTION', {})
  }
  
  public async rollback <T>(): Promise<T>{
    return this.execute('ROLLBACK', {})
  }
  
  public async commit <T>(): Promise<T> {
    return this.execute('COMMIT', {})
  }
}

export default  DBConnector;