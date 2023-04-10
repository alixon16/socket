"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/message', (req, res) => {
    res.json({
        ok: true
    });
});
exports.router.post('/message', (req, res) => {
    const { message, name } = req.body;
    res.json({
        ok: true,
        message,
        name
    });
});
exports.default = exports.router;
