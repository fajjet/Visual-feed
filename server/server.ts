import next from 'next';
import express, { Response, Request } from 'express';
import * as userController from './controllers/users';

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

        server.use(express.json());

        // API
        server.get('/api/users/:id', userController.getUser);
        server.post('/api/users', userController.addUser);

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
