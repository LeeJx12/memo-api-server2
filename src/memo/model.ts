import { AbstractModel, CustomException } from "../common/model";

export class Memo extends AbstractModel {
    memoId: string = '';
    title: string = '';
    memo: string = '';
    userId: string = '';
    writerName: string = '';
    createDate: Date = new Date();
    updateDate: Date = new Date();
}

export class MemoNotFoundException extends CustomException {
    constructor() {
        super('메모가 존재하지 않습니다!');
        this.name = 'MemoNotFoundException';
    }
}

export class WriterNotMatchedException extends CustomException {
    constructor(mode: string = 'edit') {
        super(`작성자만 ${mode === 'edit' ? '수정' : '삭제'}할 수 있습니다!`);
        this.name = 'WriterNotMatchedException';
    }
}