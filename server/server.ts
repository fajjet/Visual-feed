import next from 'next';
import express, { Response, Request } from 'express';
// @ts-ignore
import cookieParser from 'cookie-parser';

import userRouter from './controllers/users';
import { auth } from './middleware';

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
        server.use(express.json());

        // API
        server.use(userRouter);

        server.post('/api/users/me', auth, (req: Request, res: Response) => {
            const { user } = res.locals;
            res.send(user);
        });

        // server.get('/api/users/test', auth, (req: Request, res: Response) => {
        //     res.send('success');
        // });

        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
