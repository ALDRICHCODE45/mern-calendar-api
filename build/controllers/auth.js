"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.userLogin = exports.createUser = void 0;
const User_1 = require("../MongoDbModels/User");
const generateJWT_1 = require("../helpers/generateJWT");
const bcrypt = __importStar(require("bcryptjs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "un usuario ya existe con ese correo",
            });
        }
        user = new User_1.User(req.body);
        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        yield user.save();
        // generar JSON Web Token
        const token = (0, generateJWT_1.generateJWT)(user.id, user.name);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "ha ocurrido un error por favor hable con el administrador",
        });
    }
});
exports.createUser = createUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "el usuario con ese email no existe",
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "password no valido",
            });
        }
        // generar JSON WEB TOKEN
        const token = (0, generateJWT_1.generateJWT)(user.id, user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "ha ocurrido un error por favor hable con el administrador",
        });
    }
});
exports.userLogin = userLogin;
const renewToken = (req, res) => {
    const { name, uid } = req;
    //generar JWT
    const token = (0, generateJWT_1.generateJWT)(uid, name);
    res.json({
        ok: true,
        msg: "Renew JWToken",
        token,
    });
};
exports.renewToken = renewToken;
