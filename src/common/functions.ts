import { Type } from "./model";

export function setModel<T>(arr: Array<any>, type: Type<T>): Array<T> {
    return arr.map(item => new type(item));
}