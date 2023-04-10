import * as Validator from 'validatorjs';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';


export const validation = ( req: Request, res: Response, next: NextFunction ) => {

    const error = validationResult( req );

    if(!error.isEmpty()){
        return res.status(400).json({
            ok: false,
            error
        });
    }

    next();

}
