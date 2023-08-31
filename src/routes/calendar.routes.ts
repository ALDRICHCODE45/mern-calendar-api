import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/events";
import { validarJWT } from "../middlewares/validarJWT";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { isDate } from "../helpers/isDate";

export const router: Router = Router();
router.use(validarJWT);

router.get("/", getEvents);

router.post(
  "/:id",
  [
    check("title", "titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],

  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);
