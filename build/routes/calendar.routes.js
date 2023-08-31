"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const events_1 = require("../controllers/events");
const validarJWT_1 = require("../middlewares/validarJWT");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const isDate_1 = require("../helpers/isDate");
exports.router = (0, express_1.Router)();
exports.router.use(validarJWT_1.validarJWT);
exports.router.get("/", events_1.getEvents);
exports.router.post("/:id", [
    (0, express_validator_1.check)("title", "titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("start", "fecha de inicio es obligatoria").custom(isDate_1.isDate),
    (0, express_validator_1.check)("end", "fecha de finalizacion es obligatoria").custom(isDate_1.isDate),
    validarCampos_1.validarCampos,
], events_1.createEvent);
exports.router.put("/:id", events_1.updateEvent);
exports.router.delete("/:id", events_1.deleteEvent);
