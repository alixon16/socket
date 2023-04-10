import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIO } from 'socket.io';
import * as socket from '../sockets/socket';
import msgRouter from '../routes/message.route';
import balanceRouter from '../routes/balance.route';
import { engine } from 'express-handlebars';
/* import { createAdapter } from '@socket.io/cluster-adapter';
import { setupWorker } from '@socket.io/sticky'; */

export default class Server {

    private static _instance: Server;
    private app: express.Application;
    private port: string;
    private httpServer: http.Server;
    public io: SocketIO;
    private constructor(){
        this.app = express();
        this.port = process.env.PORT || '3008';
        this.httpServer = new http.Server( this.app );
        this.io = new SocketIO( this.httpServer, {
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
            }
        );
        /* this.io.adapter(createAdapter());
        setupWorker(this.io); */
        this.middlewares();
    }

    init(){
        this.httpServer.listen( this.port, () => {
            console.log(`Servidor inicializado en el puerto ${ this.port }`);
        })
    }

    public static get instance()  {
        return this._instance || ( this._instance = new this );
    }

    middlewares(){
        this.app.use( cors( { origin: true, credentials: true }) )
        this.app.use( bodyParser.urlencoded({ extended: true }) );
        this.app.use( bodyParser.json());
        this.app.use( '/api', msgRouter );
        this.app.use( '/api', balanceRouter );
        this.app.use( express.static('public') );
        this.app.engine( 'handlebars', engine() );
        this.app.set( 'view engine', '.handlebars' );
        this.app.set( 'views', './public/views' );
    }

    listenSockets(){
        this.io.on('connection', ( client ) => {
            console.log(`Cliente conectado con el id: ${ client.id }`);

            socket.message( client );

            socket.disconnect( client );

        });
    }

}
