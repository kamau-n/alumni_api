import { Request, Response } from "express"
import { appDataSource } from "../connection/configuration"
import { Alumni } from "../models/alumni.model"

export const CreateAlumni = async (req: Request, res: Response) => {

    try {
        const newAlumni = await appDataSource.getRepository(Alumni).save(req.body)
        res.json({ created: true, msg: "Create an Alumni Successfully" })


    } catch (error) {
        console.log(error)
        res.json({
            created: false,
            msg: "Unable to create alumni"
        })

    }


}


export const GetAlumni = async (req: Request, res: Response) => {

    try {
        const newAlumni = await appDataSource.getRepository(Alumni).findOne(
            {
                //@ts-ignorets-ignore
                where: {
                    alumni_login_id: req.params.id
                }
                , relations: {
                    login: true,
                    institution: true
                }
            }

        )
        res.json(newAlumni)


    } catch (error) {
        console.log(error)
        res.json({}
        )

    }


}


export const GetAlumnis = async (req: Request, res: Response) => {
    console.log("Fetching all alumnis")
    console.log(req.params)


    try {
        const newAlumni = await appDataSource.getRepository(Alumni).find(
            {
                //@ts-ignorets-ignore
                where: {
                    alumni_institution_id: req.params.id
                }
                , relations: {
                    login: true,
                    institution: true
                }
            }

        )
        console.log(newAlumni)
        res.json(newAlumni)


    } catch (error) {
        res.json([]
        )

    }


}

