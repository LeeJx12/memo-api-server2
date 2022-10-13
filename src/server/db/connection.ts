import { Knex } from "knex";
import { knex } from '../../../knexfile';

export function initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
        knex.migrate.latest()
            .then(resolve)
            .catch(reject);
    });
}

export function getConnection(tableName: string): Knex.QueryBuilder {
    return knex(tableName);
}