import next from 'next';
import express, { Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import userRouter from './controllers/users';
import postRouter from './controllers/posts';

require('dotenv').config();
require('./database');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();

        server.use(cookieParser());

        server.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

        server.use(express.json());

        server.use(userRouter);
        server.use(postRouter);

        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (err?: Error) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
