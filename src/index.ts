import Koa from 'koa';
import Router from 'koa-router';
import * as dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'koa-bodyparser';
import { initialize } from './server/db/connection';
import MemoController from './memo/controller';


const app = new Koa();

initialize()
    .then(() => {
        app.use(bodyParser());

        //TODO: api 추가
        const memoController = new MemoController();
        //router.use('/memo', memoAPI.routes());
        //router.use('/user', userAPI.routes());
        //router.use('/comment', commentAPI.routes());
        app.use(memoController.getRouter().routes()).use(memoController.getRouter().allowedMethods());
        
        app.listen(3000, () => {console.log('Memo Api Server Running!')});
    });
