"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const posts_1 = require("./entities/posts");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [posts_1.Post, User_1.User],
    dbName: 'redditclone',
    user: 'postgres',
    password: 'admin1234',
    debug: !constants_1.__prod__,
    type: 'postgresql'
};
//# sourceMappingURL=mikro-orm.config.js.map