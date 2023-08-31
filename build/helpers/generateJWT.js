"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid, name) => {
    const payload = { uid, name };
    try {
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "2h",
        });
        return token;
    }
    catch (error) {
        console.log(error);
        return "no se puede generar el token";
    }
};
exports.generateJWT = generateJWT;
