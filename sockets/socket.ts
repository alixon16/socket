import { Socket } from "socket.io";
import Server from "../classes/server";

export const disconnect = ( client: Socket ) => {

    client.on('disconnection', ( client ) => {
        console.log( `Cliente desconectado con el id: ${ client.id }`);
    });
}

export const message = ( client: Socket ) => {

    client.on('message', (payload: any) => {
        console.log(payload);
    });
}

export const balance = ( id: string, balance: string, message: string ) => {

    const server = Server.instance;
    server.io.in( id ).emit('balance', { balance, message } );

}