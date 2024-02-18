import { Router } from "express";
import { AdminSignIn } from "../controller/signin.controller";

export const adminRouter = Router()
adminRouter.post("/admin/login", AdminSignIn)