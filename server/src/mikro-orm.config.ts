import { __prod__ } from './constants';
import { Post } from './entities/posts';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { User } from './entities/User';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,  
    },
    entities: [Post,User],
    dbName: 'redditclone',
    user: 'postgres',
    password: 'admin1234',
    debug: !__prod__,
    type: 'postgresql'
}as Parameters<typeof MikroORM.init>[0];