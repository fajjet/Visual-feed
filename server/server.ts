import next from 'next';
import express, { Response, Request } from 'express';
// @ts-ignore
import cookieSession from 'cookie-session';
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

        server.all('/api/users/me', auth, (req: Request, res: Response) => {
            const { user } = res.locals;
            if (res.statusCode === 409) {
                res.clearCookie('token');
            }
            res.send(user);
        });

        server.all("*", (req: Request, res: Response) => {
            // const token = req.cookies.token;
            // if (token && (['/signin', '/signup'].includes(req.url))) {
            //     console.log(req.url)
            //     res.redirect('/');
            // }
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
