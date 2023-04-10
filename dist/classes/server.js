"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const socket = __importStar(require("../sockets/socket"));
const message_route_1 = __importDefault(require("../routes/message.route"));
const balance_route_1 = __importDefault(require("../routes/balance.route"));
const express_handlebars_1 = require("express-handlebars");
/* import { createAdapter } from '@socket.io/cluster-adapter';
import { setupWorker } from '@socket.io/sticky'; */
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3008';
        this.httpServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
                credentials: true,
            },
            path: '/sck-srv',
            transports: [
                'websocket',
                'polling'
            ]
        });
        /* this.io.adapter(createAdapter());
        setupWorker(this.io); */
        this.middlewares();
    }
    init() {
        this.httpServer.listen(this.port, () => {
            console.log(`Servidor inicializado en el puerto ${this.port}`);
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this);
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: true, credentials: true }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use('/api', message_route_1.default);
        this.app.use('/api', balance_route_1.default);
        this.app.use(express_1.default.static('public'));
        this.app.engine('handlebars', (0, express_handlebars_1.engine)());
        this.app.set('view engine', '.handlebars');
        this.app.set('views', './public/views');
    }
    listenSockets() {
        this.io.on('connection', (client) => {
            console.log(`Cliente conectado con el id: ${client.id}`);
            socket.message(client);
            socket.disconnect(client);
        });
    }
}
exports.default = Server;
