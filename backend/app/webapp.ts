import express from 'express';
import bodyParser from 'body-parser';
import { router as defaultRoutes } from './routes/default';
import { router as productRoutes } from './routes/product';
import EventEmitter from 'events';
import cors from 'cors';
import path from 'path';
const queryUrl = 'http://localhost';
const queryPort = 9000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/image', express.static(path.join(__dirname, 'image')));

const routes = [defaultRoutes, productRoutes];
routes.forEach((route) => {
    app.use('/', route);
});

const eventEmitter = new EventEmitter();
eventEmitter.on('launch', () => {
    app.listen(queryPort, () => {
        console.log('Start Webshop: HorStore');
        console.log(`Server is listening to ${queryUrl}:${queryPort}`);
    });
});
eventEmitter.emit('launch');