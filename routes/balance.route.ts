import { Router } from 'express';
import { showBalance } from '../controllers/balance.controller';
import { authentication } from '../middlewares/authentication';
import { validation } from '../middlewares/validation';
import { check } from 'express-validator';


const router = Router();

router.post('/balance',
    [
        check('id',      'El id es requerido').notEmpty(),
        check('balance', 'El balance es requerido').notEmpty(),
        check('message', 'El mensaje es requerido').notEmpty(),
        authentication,
        validation
    ],
        showBalance
);



export default router;
