import { Knex } from "knex";
import { knex } from "knexfile";
import { getConnection } from "../server/db/connection";
import { Memo } from "./model";

export class MemoService {
    connection: Knex.QueryBuilder;

    constructor() {
        this.connection = getConnection('memo');
    }

    query = (userId: string): Promise<Array<any>> => {
        return this.connection
                    .select('*')
                    .where('userId', userId);
    }

    select = (memoId: string): Promise<any> => {
        return this.connection
                    .select('*')
                    .where('memoId', memoId);
    }

    insert = async (memo: Memo): Promise<boolean> => {
        return await knex.transaction(t => {
            this.connection
                .transacting(t)
                .insert(memo)
                .then(t.commit, t.rollback);
        })
    }

    delete = async (memoId: string): Promise<boolean> => {
        return await knex.transaction(t => {
            this.connection
                .transacting(t)
                .where('memoId', memoId)
                .del()
                .then(t.commit, t.rollback);
        })
    }

    update = async (memo: Memo): Promise<boolean> => {
        return await knex.transaction(t => {
            this.connection
                .transacting(t)
                .where('memoId', memo.memoId)
                .update(memo)
                .then(t.commit, t.rollback);
        })
    }
}