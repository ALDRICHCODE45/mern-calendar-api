"use strict";
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
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvents = void 0;
const Event_1 = require("../MongoDbModels/Event");
const getEvents = (_re, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { email, password }: createUserQueryParamas = req.body;
    const events = yield Event_1.Event.find().populate("user", "name");
    res.status(201).json({
        ok: true,
        events,
    });
});
exports.getEvents = getEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.Event(req.body);
    try {
        event.user = req.uid;
        const savedEvent = yield event.save();
        res.json({
            ok: true,
            event: savedEvent,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "hable con el admin...",
        });
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEvent = req.params.id;
    const uid = req.uid;
    try {
        const event = yield Event_1.Event.findById(idEvent);
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
        const newEvent = Object.assign(Object.assign({}, req.body), { user: uid });
        const updatedEvent = yield Event_1.Event.findByIdAndUpdate(idEvent, newEvent, {
            new: true,
        });
        res.json({
            ok: true,
            event: updatedEvent,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "hable con el admin",
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEvent = req.params.id;
    const uid = req.uid;
    try {
        const event = yield Event_1.Event.findById(idEvent);
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
        yield Event_1.Event.findByIdAndDelete(idEvent);
        res.json({
            ok: true,
            msg: `evento con el id: ${idEvent} eliminado correctamente`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "hable con el admin",
        });
    }
});
exports.deleteEvent = deleteEvent;
