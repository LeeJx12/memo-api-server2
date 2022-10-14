import Router from "koa-router";
import { Context } from "koa";
import { MemoService } from "./service";
import { setModel, setModels } from "../common/functions";
import { Memo, MemoNotFoundException, WriterNotMatchedException } from "./model";
import { v4 as uuid } from 'uuid';
import { SessionExpiredException } from "../common/model";

export default class MemoController {
    router: Router;

    service: MemoService;

    constructor() {
        this.router = new Router();
        this.router.get('/memo', this.routing(this.listMemo));
        this.router.get('/memo/:memoId', this.routing(this.getMemo));
        this.router.post('/memo', this.routing(this.addMemo));
        this.router.delete('/memo/:memoId', this.routing(this.delMemo));
        this.router.put('/memo/:memoId', this.routing(this.editMemo));

        this.service = new MemoService();
    }

    getRouter = () => {
        return this.router;
    }

    routing = (nextFn: Function): Router.IMiddleware => {
        return (ctx: Context) => {
            if (!ctx.session?.user) {
                throw new SessionExpiredException();
            }

            nextFn(ctx);
        }
    }

    listMemo = async (ctx: Context) => {
        const userId = ctx.session?.user.userId;

        let memoList = await this.service.query(userId) || [];
        memoList = setModels(memoList, Memo);

        ctx.body = JSON.stringify(memoList);
    }

    getMemo = async (ctx: Context) => {
        const memoId = ctx.params.memoId;

        let memo = await this.service.select(memoId) || {};
        memo = setModel(memo, Memo);

        ctx.body = JSON.stringify(memo);
    }

    addMemo = async (ctx: Context) => {
        const memo = setModel(ctx.params, Memo);
        memo.memoId = uuid();
        memo.userId = ctx.session?.user.userId;
        memo.writerName = ctx.session?.user.userName;

        const result = await this.service.insert(memo);
        ctx.body = result;
    }

    delMemo = async (ctx: Context) => {
        const memoId = ctx.params.memoId;
        const userId = ctx.session?.user.userId;

        let orgMemo = await this.service.select(memoId);

        if (!orgMemo) {
            throw new MemoNotFoundException();
        }
        if (orgMemo.userId !== userId) {
            throw new WriterNotMatchedException('del');
        }

        const result = await this.service.delete(memoId);
        ctx.body = result;
    }

    editMemo = async (ctx: Context) => {
        const memoId = ctx.params.memoId;
        const userId = ctx.session?.user.userId;

        let orgMemo = await this.service.select(memoId);
        orgMemo = setModel(orgMemo, Memo);

        if (!orgMemo) {
            throw new MemoNotFoundException();
        }
        if (orgMemo.userId !== userId) {
            throw new WriterNotMatchedException('edit');
        }

        Object.assign(orgMemo, ctx.params);

        const result = await this.service.update(orgMemo);
        ctx.body = result;
    }
}