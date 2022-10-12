import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { knex } from '../knexfile';

const app = new Koa();
const router = new Router();

knex.migrate.latest()
    .then(() => {
        app.use(bodyParser());
        //TODO: api 추가
        //router.use('/memo', memoAPI.routes());
        //router.use('/user', userAPI.routes());
        //router.use('/comment', commentAPI.routes());
        //app.use(router.routes()).use(router.allowedMethods());
        
        app.listen(3000, () => {console.log('Memo Api Server Running!')});
    });
