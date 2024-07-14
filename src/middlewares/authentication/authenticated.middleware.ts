import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken"

export const requireAuthentication = (req: Request, res: Response, next: NextFunction) => {
   console.log(req.headers)
   next()



}
