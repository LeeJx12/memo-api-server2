import { AbstractModel } from "../common/model";

export class Memo extends AbstractModel {
    memoId: string = '';
    title: string = '';
    memo: string = '';
    userId: string = '';
    writerName: string = '';
    createDate: Date = new Date();
    updateDate: Date = new Date();
}