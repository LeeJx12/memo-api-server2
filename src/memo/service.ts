import { Knex } from "knex";
import { knex } from "knexfile";

export class MemoService {
    connection: Knex.QueryBuilder;

    constructor() {
        this.connection = knex('memo');
    }

    listMemo = () => {
        return new Promise((resolve, reject) => {
            resolve(this.connection.select('*'));
        })
    }
}