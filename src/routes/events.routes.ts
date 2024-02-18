import { Router } from "express";
import { CreateEvent, CreateReservation, DeleteEvent, GetEvents, } from "../controller/events.controller";

export const eventsRouter = Router()

eventsRouter.post("/events", CreateEvent)
eventsRouter.get("/events", GetEvents)
eventsRouter.get("/events/:id", CreateReservation)
eventsRouter.delete("/events/:id", DeleteEvent)