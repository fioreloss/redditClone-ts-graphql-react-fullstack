"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUpvoteLoader_1 = require("./utils/createUpvoteLoader");
const Upvote_1 = require("./entities/Upvote");
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const Post_2 = require("./resolvers/Post");
const User_2 = require("./resolvers/User");
const path_1 = __importDefault(require("path"));
const createUserLoader_1 = require("./utils/createUserLoader");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const con = yield typeorm_1.createConnection({
        type: 'postgres',
        database: 'redditclone',
        username: 'postgres',
        password: 'admin1234',
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Post_1.Post, User_1.User, Upvote_1.Upvote]
    });
    yield con.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: 'lax'
        },
        saveUninitialized: false,
        secret: 'hmhfjhhjkjblbnl',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [Post_2.PostResolver, User_2.UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({
            req, res, redis,
            userLoader: createUserLoader_1.createUserLoader(),
            upvoteLoader: createUpvoteLoader_1.createUpvoteLoader(),
        })
    });
    apolloServer.applyMiddleware({ app, cors: false, });
    app.listen(4000, () => {
        console.log('server started on  localhost:4000');
    });
});
main();
//# sourceMappingURL=index.js.map