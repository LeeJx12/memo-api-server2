import path from 'path';
import Knex from 'knex';

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
const { PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const knex = Knex({
  client: 'postgresql',
  connection: {
    host: PG_HOST,
    port: 5432,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  }
})