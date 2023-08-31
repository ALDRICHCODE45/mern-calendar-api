"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
exports.router = (0, express_1.Router)();
exports.router.post("/newUser", [
    (0, express_validator_1.check)("name", "el campo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "el email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "la password debe ser de 6 caracteres").isLength({
        min: 6,
    }),
    validarCampos_1.validarCampos,
], auth_1.createUser);
exports.router.post("/", [
    (0, express_validator_1.check)("email", "el email no es valido").isEmail(),
    (0, express_validator_1.check)("password", "la password debe ser de 6 caracteres").isLength({
        min: 6,
    }),
    validarCampos_1.validarCampos,
], auth_1.userLogin);
exports.router.get("/renew", validarJWT_1.validarJWT, auth_1.renewToken);
