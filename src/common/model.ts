
export class AbstractModel {
    constructor(jsonObj: Object) {
        Object.assign(this, jsonObj);
    }
}

export interface Type<T> extends Function {
    new (...args: any[]): T;
};