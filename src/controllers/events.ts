import { Event } from "../MongoDbModels/Event";
import { generateJWT } from "../helpers/generateJWT";
import {
  FunctionControllers,
  createUserQueryParamas,
  loginUserQueryParams,
} from "./interfaces/auth";

export const getEvents = async (_re: any, res) => {
  //   const { email, password }: createUserQueryParamas = req.body;
  const events = await Event.find().populate("user", "name");

  res.status(201).json({
    ok: true,
    events,
  });
};

export const createEvent: FunctionControllers = async (req: any, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "hable con el admin...",
    });
  }
};

export const updateEvent: FunctionControllers = async (req: any, res) => {
  const idEvent = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(idEvent);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "hable con el admin",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no estas autorizado para cambiar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(idEvent, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

export const deleteEvent: FunctionControllers = async (req: any, res) => {
  const idEvent = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(idEvent);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "hable con el admin",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no estas autorizado para cambiar este evento",
      });
    }

    await Event.findByIdAndDelete(idEvent);

    res.json({
      ok: true,
      msg: `evento con el id: ${idEvent} eliminado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
