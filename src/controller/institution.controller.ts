import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Institution } from "../models/institution.model";
import { Chat } from "../models/chat.model";
import { InstitutionConnection } from "../models/institution_connection.model";

export const InstitutionAdd = async (req: Request, res: Response) => {
    console.log("adding institution")
    console.log(req.body)

    //@ts-ignore  


    try {

        const save_inst = await appDataSource.getRepository(Institution).save(req.body)

        const inst_id = save_inst.institution_id

        const newChat = await appDataSource.getRepository(Chat).save({
            chat_status: "active"
        })
        const inst_chat = newChat.chat_id

        const new_conn = await appDataSource.getRepository(InstitutionConnection).save({
            institution_connection_chat_id: inst_chat,
            institution_connection_instution_id: inst_id

        })
        console.log(new_conn)

        res.json({ msg: " Institution addded  successfully", posted: true })





    } catch (error) {
        console.log(error)

        res.json({ msg: "unable add  Institution", posted: false })

    }







}



export const getSchools = async (req: Request, res: Response) => {
    console.log("Getting Schools")


    //@ts-ignore  


    try {

        const save_message = await appDataSource.getRepository(Institution).find({
            relations: {
                institutionconnection: true
            }
        })
        res.json(save_message)




    } catch (error) {
        console.log(error)

        res.json([])

    }

}


export const deleteSchool = async (req: Request, res: Response) => {
    console.log("Deleting  A Schools")
    const idToDelete: any = req.params.id

    try {
        const deleted_school = await appDataSource.getRepository(Institution).delete({

            institution_id: idToDelete

        })
        res.json({ msg: "school delete successfully", deleted: true })

    } catch (error) {
        console.log(error)

        res.json({
            msg: "unable to delete", deleted: false
        })

    }

}


export const getSchool = async (req: Request, res: Response) => {
    console.log("Getting  A Schools")


    //@ts-ignore  


    try {

        const save_message = await appDataSource.getRepository(Institution).findOne({
            //@ts-ignore
            where: {
                institution_id: req.params.id
            },
            relations: {
                institutionconnection: true
            }
        })
        res.json(save_message)




    } catch (error) {
        console.log(error)

        res.json([])

    }

}