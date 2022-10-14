
export class AbstractModel {
    constructor(jsonObj: Object) {
        Object.assign(this, jsonObj);
    }
}

export interface Type<T> extends Function {
    new (...args: any[]): T;
};

export abstract class CustomException extends Error {
    status: number = 500;
}

export class SessionExpiredException extends CustomException {
    constructor() {
        super('세션이 만료되었습니다!');
        this.name = 'SessionExpiredException';
    }
}