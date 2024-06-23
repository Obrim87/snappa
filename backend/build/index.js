"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const { PORT } = require('./utils/config');
const app = (0, express_1.default)();
app.get('/', (_req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
