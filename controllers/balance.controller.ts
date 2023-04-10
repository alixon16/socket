import { Request, Response } from "express";
import * as socket from '../sockets/socket';

export const showBalance = ( req: Request, res: Response ) => {

    const { id, balance, message } = req.body;

    socket.balance( id, balance, message );

    res.json({
        ok: true,
        id,
    });

}