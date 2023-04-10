import { Request, Response } from "express";

export const authentication = ( req: Request, res: Response, next: Function ) => {

    const token = req.headers.authorization;
    const data = `${ process.env.CLIENTID }:${ process.env.SECRET }`;
    const base64 = Buffer.from(data).toString('base64');

    if(`Bearer ${ base64 }` !== token ) {
        return res.status(400).json({
            ok: false,
            error: 'Unauthorized',
            data
        });
    }

    next();

}
