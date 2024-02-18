import { Router } from "express";
import { CreateAlumni, GetAlumni, GetAlumnis } from "../controller/alumni.controller";


export const alumniRoute = Router()

alumniRoute.post("/alumni", CreateAlumni)
alumniRoute.get("/alumni/:id", GetAlumni)
alumniRoute.get("/alumnis/:id", GetAlumnis)