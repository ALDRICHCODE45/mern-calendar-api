import {
  Request,
  Response,
  RequestParamHandler,
  RequestHandler,
} from "express";

export interface middleWaresFunction {
  (request: Request, response: Response, next: Function): void;
}

export interface middleWaresFunction2 {
  (request: RequestHandler, response: Response, next: Function): void;
}
