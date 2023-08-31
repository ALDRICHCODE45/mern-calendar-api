import { Router } from "express";
import { createUser, renewToken, userLogin } from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

export const router: Router = Router();

router.post(
  "/newUser",
  [
    check("name", "el campo es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "el email no es valido").isEmail(),
    check("password", "la password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  userLogin
);

router.get("/renew", validarJWT, renewToken);
