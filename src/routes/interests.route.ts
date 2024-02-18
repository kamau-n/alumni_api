import { Router } from "express";
import { Interests } from "../models/Interests.nodel";
import { CreateInterests, CreateUserInterests, DeleteInterest, DeleteInterests, GetAllInterest, GetUserInterest } from "../controller/Interests.controller";

export const interestsRoute = Router();
interestsRoute.post("/interests", CreateInterests)
interestsRoute.get("/interests", GetAllInterest)
interestsRoute.delete("/interests/:id", DeleteInterests)
interestsRoute.post("/interests/user", CreateUserInterests)
interestsRoute.get('/interests/user/:id', GetUserInterest)
interestsRoute.delete('/interests/user/:id', DeleteInterest)

