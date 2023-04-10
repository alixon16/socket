import Server from "./classes/server";
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({ path: path.join(__dirname, '/../.env') });

const server = Server.instance;

server.init();

server.listenSockets();

