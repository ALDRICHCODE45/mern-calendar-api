import { Request, Response } from "express";

export interface FunctionControllers {
  (request: Request, response: Response): void;
}

export interface createUserQueryParamas {
  name: string;
  email: string;
  password: string;
}

export interface loginUserQueryParams {
  email: string;
  password: string;
}
