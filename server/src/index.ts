import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import "reflect-metadata";
import { MyContext } from 'src/types';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { PostResolver } from './resolvers/Post';
import { UserResolver } from "./resolvers/User";

const main = async () => {
   

    const con = await createConnection({
        type: 'postgres',
        database: 'redditclone',
        username: 'postgres',
        password: 'admin1234',
        logging: true,
        synchronize: true,
        entities:[Post, User]
    });
    

    const app = express();
    
    const RedisStore = connectRedis(session)
    const redis = new Redis();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials:true,        
    }))

app.use(
    session({
      name:COOKIE_NAME,
        store: new RedisStore({
            client: redis,
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
        context:({req,res}):MyContext=>({ req, res, redis})
    })
    apolloServer.applyMiddleware({ app, cors: false, });
    


    app.listen(4000, () => {
        console.log('server started on  localhost:4000')
    })

}
main();