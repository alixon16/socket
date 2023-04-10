"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balance_controller_1 = require("../controllers/balance.controller");
const authentication_1 = require("../middlewares/authentication");
const validation_1 = require("../middlewares/validation");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/balance', [
    (0, express_validator_1.check)('id', 'El id es requerido').notEmpty(),
    (0, express_validator_1.check)('balance', 'El balance es requerido').notEmpty(),
    (0, express_validator_1.check)('message', 'El mensaje es requerido').notEmpty(),
    authentication_1.authentication,
    validation_1.validation
], balance_controller_1.showBalance);
exports.default = router;
