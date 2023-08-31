import { middleWaresFunction } from "./interfaces/middlewares";
import { validationResult } from "express-validator";

export const validarCampos: middleWaresFunction = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: errors.mapped(),
    });
  }
  next();
};
