"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    const data = `${process.env.CLIENTID}:${process.env.SECRET}`;
    const base64 = Buffer.from(data).toString('base64');
    if (`Bearer ${base64}` !== token) {
        return res.status(400).json({
            ok: false,
            error: 'Unauthorized',
            data
        });
    }
    next();
};
exports.authentication = authentication;
