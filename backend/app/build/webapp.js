"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const default_1 = require("./routes/default");
const product_1 = require("./routes/product");
const events_1 = __importDefault(require("events"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const queryUrl = 'http://localhost';
const queryPort = 9000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/image', express_1.default.static(path_1.default.join(__dirname, 'image')));
const routes = [default_1.router, product_1.router];
routes.forEach((route) => {
    app.use('/', route);
});
const eventEmitter = new events_1.default();
eventEmitter.on('launch', () => {
    app.listen(queryPort, () => {
        console.log('Start Webshop: HorStore');
        console.log(`Server is listening to ${queryUrl}:${queryPort}`);
    });
});
eventEmitter.emit('launch');
