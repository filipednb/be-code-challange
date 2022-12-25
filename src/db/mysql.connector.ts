import { createPool, Pool} from 'mysql2';
import { source } from '../db/config';

let pool: Pool;

export const init = () => {
  try {
    pool = createPool({
      host: source.DB_HOST,
      user: source.DB_USER,
      password: source.DB_PASSWORD,
      database: source.DB_DATABASE,
    });

    console.debug('Pool generated successfully');
  } catch (error) {
    console.error(error);
    throw new Error('failed to initialized pool');
  }
};


export const execute = <T>(query: string, params: string[] | unknown): Promise<T> => {
  try {
    if (!pool) throw new Error('Unable to find pool');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results: any) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error(error);
    throw new Error('Failed to execute MySQL query');
  }
}

export const beginTransaction = () => {
  return execute('START TRANSACTION', {})
}

export const rollback = () => {
  return execute('START TRANSACTION', {})
}

export const commit = () => {
  return execute('START TRANSACTION', {})
}