import { Knex } from "knex";
import { getConnection } from "../server/db/connection";

export class MemoService {
    connection: Knex.QueryBuilder;

    constructor() {
        this.connection = getConnection('memo');
    }

    listMemo = () => {
        return this.connection.select('*');
    }

    getMemo = (memoId: string) => {
        return this.connection.select('*')
                    .where('memoId', memoId)
    }
}