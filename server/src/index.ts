import { MyContext } from 'src/types';
import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core'
import { __prod__, COOKIE_NAME } from './constants';
import microConfig from './mikro-orm.config'
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/Post';
import { UserResolver } from "./resolvers/User";
import cors from 'cors'
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'

const main = async () => {
    
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials:true,        
    }))

app.use(
    session({
      name:COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge:1000*60*60*24*365*10,
            httpOnly: true,
            secure: __prod__,
            sameSite:'lax'
        },
    saveUninitialized: false,
    secret: 'hmhfjhhjkjblbnl',
    resave: false,
  })
)

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver,UserResolver],
            validate:false
        }),
        context:({req,res}):MyContext=>({em:orm.em,req,res})
    })
    apolloServer.applyMiddleware({ app, cors: false, });
    


    app.listen(4000, () => {
        console.log('server started on  localhost:4000')
    })

}
main();