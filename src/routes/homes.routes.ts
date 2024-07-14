import { Request, Response, Router } from "express";
import { CreateChat, GetChatRoom, GetChatRoomChats, GetUserChats } from "../controller/chat.controller";

export const HomeRouter = Router()
HomeRouter.get("/",(req:Request,res:Response)=>{
    return "<h2> Welcome to alumni application <h2>"
})


