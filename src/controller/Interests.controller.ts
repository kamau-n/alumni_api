import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Interests } from "../models/Interests.nodel";
import { UserInterest } from "../models/user-interest.model";
import { all } from "axios";

export const CreateInterests = async (req: Request, res: Response) => {
    console.log("Adding interest")
    try {
        await appDataSource.getRepository(Interests).save(req.body)

        res.json({
            msg: "Interest added Successfully",
            created: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: "Unable to add Interest",
            created: false
        })
    }

}

export const DeleteInterests = async (req: Request, res: Response) => {
    console.log("Deleting an interest")

    const idToDelete: any = req.params.id

    try {
        const deleted_school = await appDataSource.getRepository(Interests).delete({

            interest_id: idToDelete

        })
        res.json({ msg: "Interest deleted successfully", deleted: true })

    } catch (error) {
        console.log(error)

        res.json({
            msg: "unable to delete Interest", deleted: false
        })

    }

}


export const GetAllInterest = async (req: Request, res: Response) => {
    console.log("Getting all  interests")
    try {
        const allInterest = await appDataSource.getRepository(Interests).find()

        res.send(allInterest

        )

    } catch (error) {
        console.log(error)
        res.send([])
    }

}


export const GetUserInterest = async (req: Request, res: Response) => {
    console.log("Getting a user interest" + req.params.id)
    try {
        const interests = await appDataSource.getRepository(UserInterest).find({
            //@ts-ignore
            where: {
                user_interest_user_id: req.params.id
            },
            relations: {
                interest: true
            }
        })

        res.send(interests)



    } catch (error) {
        console.log(error)
        res.send([])
    }

}

export const DeleteInterest =
    async (req: Request, res: Response) => {
        console.log("Deleting a user interest" + req.params.id)
        const idToDelete: any = req.params.id
        try {
            const interests = await appDataSource.getRepository(UserInterest).delete({
                //@ts-ignore
                user_interest_id: idToDelete
            }





            )

            console.log(interests)

            res.json({ msg: "interest deleted successfully", created: true })



        } catch (error) {
            console.log(error)
            res.json({
                msg: "Unable to delete user interest",
                created: false
            })

        }

    }

export const CreateUserInterests = async (req: Request, res: Response) => {
    console.log("Adding user interest")
    try {
        await appDataSource.getRepository(UserInterest).save(req.body)

        res.json({
            msg: "User Interest added Successfully",
            created: true
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: "Unable to add user interest",
            created: false
        })
    }

}