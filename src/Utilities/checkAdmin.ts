import { Request } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";

export const checkAdmin = async (req: Request) => {
    const userEmail = req.body.login_email;

    const userAdmin = await appDataSource.getRepository(Login).findOne({
        where: {
            login_email: userEmail
        }
    })
    console.log("this is the admin login")
    console.log(userAdmin)

    if (userAdmin?.login_role == "ADMIN") {
        console.log("Is Admin")
        return true;
    }
    else {
        console.log("Not Admin")
        return false;
    }
}
