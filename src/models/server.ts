import express from "express";
import dotenv from "dotenv";
import { router as authRouter } from "../routes/auth.routes";
import { router as eventsRouter } from "../routes/calendar.routes";
import { dbConection } from "../DB/config";
import cors from "cors";
import { Express } from "express-serve-static-core";

dotenv.config();

export class Server {
  private app: Express;
  private port: string;
  private usuariosPath: string = "/api/auth";
  private eventsPath: string = "/api/events";

  constructor() {
    this.app = express(); //inicializar app
    this.port = process.env.PORT; //puerto de la aplicacion

    //middlewares
    this.middlewares();
    //rutas
    this.routes();
    //DB
    this.DB();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.static("../public"));
    this.app.use(cors());
  }

  routes(): void {
    this.app.use(this.usuariosPath, authRouter);
    this.app.use(this.eventsPath, eventsRouter);
  }

  DB(): void {
    dbConection();
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`servidor escuchando `);
    });
  }
}
