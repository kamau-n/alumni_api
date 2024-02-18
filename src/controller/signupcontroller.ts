import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import { encryptPassword } from "../Utilities/functions/encrypt.password";
import multer from "multer";






export const signUp = async (req: Request, res: Response) => {

    console.log(req.file?.path)
    try {
        console.log("Accessed Register Route")
        console.log(req.body)
        const hashed_password: string = await encryptPassword(req.body.password)

        const new_user = {
            login_email: req.body.email,
            login_role: "USER",
            login_contact: req.body.contact,
            login_location: req.body.location,
            login_password: hashed_password,
            login_name: req.body.username,
            login_profile_pic: req.body.login_profile_pic

        }


        try {
            const User = appDataSource.getRepository(Login)

            await User.save(new_user)

            res.json({ created: true, msg: "User Created Successfully" })

        } catch (error) {
            res.json({ created: false, msg: "Unable to create user ,user valid email " })
            console.log(error, error)


        }



    } catch (error) {
        console.log(error)
        res.json({ msg: "ubable to Register", created: false })

    }




}

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.send(await appDataSource.getRepository(Login).find({
            relations: {
                admins: true
            }
        }))

    } catch (error) {
        console.log(error)

    }

}