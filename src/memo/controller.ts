import Router from "koa-router";
import { Context } from "koa";
import { MemoService } from "./service";

export default class MemoController {
    router: Router;

    service: MemoService;

    constructor() {
        this.router = new Router();
        this.router.get('/memo', this.listMemo);
        this.router.get('/memo/:memoId', this.getMemo);
        this.router.post('/memo', this.addMemo);
        this.router.delete('/memo/:memoId', this.delMemo);
        this.router.put('/memo/:memoId', this.editMemo);

        this.service = new MemoService();
    }

    getRouter = () => {
        return this.router;
    }

    listMemo = (ctx: Context) => {
        this.service.listMemo()
            .then(memoList => {
                ctx.body = memoList;
            })
    }

    getMemo = (ctx: Context) => {

    }

    addMemo = (ctx: Context) => {

    }

    delMemo = (ctx: Context) => {

    }

    editMemo = (ctx: Context) => {

    }
}