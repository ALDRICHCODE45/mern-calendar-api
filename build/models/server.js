"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = require("../routes/auth.routes");
const calendar_routes_1 = require("../routes/calendar.routes");
const config_1 = require("../DB/config");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.usuariosPath = "/api/auth";
        this.eventsPath = "/api/events";
        this.app = (0, express_1.default)(); //inicializar app
        this.port = process.env.PORT; //puerto de la aplicacion
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
        //DB
        this.DB();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("../public"));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(this.usuariosPath, auth_routes_1.router);
        this.app.use(this.eventsPath, calendar_routes_1.router);
    }
    DB() {
        (0, config_1.dbConection)();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor escuchando `);
        });
    }
}
exports.Server = Server;
