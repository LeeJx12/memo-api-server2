import path from 'path';
import Knex from 'knex';

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

export const knex = Knex({
  client: 'postgresql',
  connection: {
    database: 'memo',
    user: 'memo',
    password: 'a'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  }
})