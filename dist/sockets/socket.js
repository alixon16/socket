"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balance = exports.message = exports.disconnect = void 0;
const server_1 = __importDefault(require("../classes/server"));
const disconnect = (client) => {
    client.on('disconnection', (client) => {
        console.log(`Cliente desconectado con el id: ${client.id}`);
    });
};
exports.disconnect = disconnect;
const message = (client) => {
    client.on('message', (payload) => {
        console.log(payload);
    });
};
exports.message = message;
const balance = (id, balance, message) => {
    const server = server_1.default.instance;
    server.io.in(id).emit('balance', { balance, message });
};
exports.balance = balance;
