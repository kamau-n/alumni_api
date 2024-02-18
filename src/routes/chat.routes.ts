import { Router } from "express";
import { CreateChat, GetChatRoom, GetChatRoomChats, GetUserChats } from "../controller/chat.controller";

export const chatRouter = Router()
chatRouter.post("/chat", CreateChat)
chatRouter.get("/chats/:id", GetUserChats)
chatRouter.get("/chatroom/:id", GetChatRoom)
chatRouter.get("/chatroom/chats/:id", GetChatRoomChats)
