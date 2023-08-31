"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "no hay token en la peticion",
        });
    }
    try {
        const { name, uid } = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token no valido",
        });
    }
    next();
};
exports.validarJWT = validarJWT;
