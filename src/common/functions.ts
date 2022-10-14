import { Context, Next } from "koa";
import { Type } from "./model";

export function setModels<T>(arr: Array<any>, type: Type<T>): Array<T> {
    return arr.map(item => new type(item));
}

export function setModel<T>(obj: Object, type: Type<T>): T {
    return new type(obj);
}

export async function exceptionHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (e: any) {
        ctx.status = e.status || 500;
        ctx.body = e.message;
        ctx.app.emit('error', e, ctx);
    }
}