import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Chat } from "../models/chat.model";
import { Messages } from "../models/messages.models";

export const CreateChat = async (req: Request, res: Response) => {
    console.log(req.body)
    const existingChat = await appDataSource.getRepository(Chat).findOne({
        where: [
            { chat_receiver_id: req.body.chat_sender_id, chat_sender_id: req.body.chat_receiver_id },
            { chat_receiver_id: req.body.chat_receiver_id, chat_sender_id: req.body.chat_sender_id },
        ],
    });

    console.log("this is the existing chat")

    console.log(existingChat)
    if (existingChat != null) {
        console.log("there is an existing chat")
        res.json({
            msg: " created chat successfully", created: true, chatId: existingChat.chat_id

        })

    }
    else {
        console.log("we are creating a new chat")

        try {
            const newChat = await appDataSource.getRepository(Chat).save(req.body)
            console.log(newChat)
            res.json({
                msg: " created chat successfully", created: true, chatId: newChat.chat_id

            })


        } catch (error) {
            console.log(error)
            res.json({
                msg: "unable to create chat", created: false, chaId: null

            })

        }
    }


}


export const GetChatRoom = async (req: Request, res: Response) => {
    try {



        const chatRoom = await appDataSource.getRepository(Chat).findOne({
            //@ts-ignore
            where: {
                chat_id: req.params.id
            }, relations: {
                sender: true,
                receiver: true
            }

        })

        res.send(chatRoom)

    } catch (error) {
        console.log(error)
        res.send([])

    }
}

export const GetChatRoomChats = async (req: Request, res: Response) => {
    console.log("Getting chat room chats")
    try {




        const chatRoom = await appDataSource.getRepository(Messages).find({
            //@ts-ignore
            where: {
                message_chat_id: req.params.id
            }, relations: {
                sender: true,
                receiver: true
            }

        })

        res.send(chatRoom)

    } catch (error) {
        console.log(error)
        res.send([])

    }
}

export const GetUserChats = async (req: Request, res: Response) => {
    try {
        res.send(await appDataSource.getRepository(Chat).find({
            where: [

                { chat_receiver_id: req.params.id }, { chat_sender_id: req.params.id }

            ],

            relations: {
                sender: true,
                receiver: true
            }
        }

        ))

    } catch (error) {
        res.send([])

    }

}