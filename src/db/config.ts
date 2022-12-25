export const source = {
    DB_DATABASE: process.env.MYSQL_DB_DATABASE,
    DB_CONNECTION_LIMIT: process.env.MYSQL_DB_CONNECTION_LIMIT || 4,
    DB_HOST: process.env.MYSQL_DB_HOST,
    DB_USER: process.env.MYSQL_DB_USER,
    DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
    DB_PORT: process.env.MYSQL_DB_PORT,
};
