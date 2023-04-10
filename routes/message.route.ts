import { Request, Response, Router } from "express";

export const router = Router();

router.get('/message', ( req: Request, res: Response ) => {

    res.json({
        ok: true
    });

});

router.post('/message', ( req: Request, res: Response ) => {

    const { message, name } = req.body;

    res.json({
        ok: true,
        message,
        name
    });

});


export default router;