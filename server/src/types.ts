import { createUpvoteLoader } from './utils/createUpvoteLoader';
import { createUserLoader } from './utils/createUserLoader';

import { Request, Response } from "express";
import { Redis } from "ioredis";


export type MyContext={
    
    req: Request ;
    redis: Redis;
    res: Response;
    userLoader: ReturnType<typeof createUserLoader>;
    upvoteLoader: ReturnType<typeof createUpvoteLoader>;
}

