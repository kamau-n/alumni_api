import { Request, Response } from "express";
import { appDataSource } from "../connection/configuration";
import { Login } from "../models/login.model";
import { decryptPassword, encryptPassword } from "../Utilities/functions/encrypt.password";
import jwt, { Secret } from "jsonwebtoken"
import { checkAdmin } from "../Utilities/checkAdmin";
import { Admins } from "../models/admins.model";




export const updateUser = async (req: Request, res: Response) => {

    console.log("Updating user details")
    console.log(req.body)
    try {
        const user_reset = await appDataSource.createQueryBuilder()
            .update(Login)
            .set({ login_email: req.body.email, login_name: req.body.username, login_contact: req.body.contact, login_location: req.body.location })
            .where("login_id =:reset_id", { reset_id: req.body.id })
            .execute()


        user_reset.affected == 0 ? res.json({ msg: "unable to update, ", reset: false }) :
            res.json({ msg: "User Updated Sucessfully", reset: true })

    }
    catch (err) {
        console.log(err)
        res.json({ msg: "unable to update, ", reset: false })

    }

}


export const signIn = async (req: Request, res: Response) => {
    console.log("Accessed the login route")
    console.log(req.body)
    try {


        try {
            const User = await appDataSource.createQueryBuilder()
                .select()
                .from(Login, 'user')
                .where("user.login_email=:email", { email: req.body.email })
                .execute()


            const User2 = await appDataSource.getRepository(Login).findOne({
                where: {
                    login_email: req.body.email
                }
                , relations: {
                    alumni: true,
                    admins: true
                }


            })
            console.log(User2)

            const new_user = User;

            if (User2) {
                if (await decryptPassword(req.body.password, User2.login_password)) {
                    console.log("authentication successfull")

                    const accessToken = jwt.sign({
                        id: User2.login_id,
                        name: User2.login_name,
                        contact: User2.login_contact,
                        email: User2.login_email,
                        profile: User2.login_profile_pic,
                        role: User2.login_role,
                        location: User2.login_location,
                        alumni: User2.alumni
                    }, "i hve a secret", { expiresIn: "1h" })

                    const refreshToken = jwt.sign({
                        id: User2.login_id,
                        name: User2.login_name,
                        address: User2.login_location,
                        email: User2.login_email,
                        role: User2.login_role,
                        contact: User2.login_contact,

                    }, "i hve a secret", { expiresIn: "1y" })



                    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: false }).cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 * 12, httpOnly: true, secure: false }).json({
                        authenticated: true, msg: "login successfull", role: User2.login_role, accessToken: accessToken, refreshToken: refreshToken, admins: User2.admins
                    })
                    //.setHeader("Authorization", accessToken)



                }
                else {
                    res.json({ authenticated: false, msg: "Unable to authenticate  user ,wrong password " })
                    console.log("wrong password")

                }


            }
            else {

                res.json({ authenticated: false, msg: "Unable to authenticate  user ,user does not exist " })

            }

            // res.json({ created: true, msg: "User authenticated  Successfully" })

        } catch (error) {

            res.json({ created: false, msg: "Unable to authenticate  user ,user valid email " })


        }



    } catch (error) {
        res.json({ msg: "ubable to login" })

    }






}




export const AdminSignIn = async (req: Request, res: Response) => {
    console.log("Accessed the login route")
    console.log(req.body)

    if (await checkAdmin(req)) {
        try {


            try {
                const User = await appDataSource.createQueryBuilder()
                    .select()
                    .from(Login, 'user')
                    .where("user.login_email=:email", { email: req.body.login_email })
                    .execute()


                const User2 = await appDataSource.getRepository(Login).findOne({
                    where: {
                        login_email: req.body.email
                    }
                    , relations: {
                        alumni: true
                    }


                })
                console.log(User2)

                const new_user = User;

                if (User2) {
                    if (await decryptPassword(req.body.password, User2.login_password)) {
                        console.log("authentication successfull")

                        const accessToken = jwt.sign({
                            id: User2.login_id,
                            name: User2.login_name,
                            contact: User2.login_contact,
                            email: User2.login_email,
                            role: User2.login_role,
                            location: User2.login_location,
                            alumni: User2.alumni
                        }, "i hve a secret", { expiresIn: "1h" })



                        res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: false }).json({
                            authenticated: true, msg: "login successfull", role: User2.login_role, accessToken: accessToken,
                        })
                        //.setHeader("Authorization", accessToken)



                    }
                    else {
                        res.json({ authenticated: false, msg: "Unable to authenticate  user ,wrong password " })
                        console.log("wrong password")

                    }


                }
                else {

                    res.json({ authenticated: false, msg: "Unable to authenticate  user ,user does not exist " })

                }

                // res.json({ created: true, msg: "User authenticated  Successfully" })

            } catch (error) {

                res.json({ created: false, msg: "Unable to authenticate  user ,user valid email " })


            }




        } catch (error) {
            res.json({ msg: "ubable to login" })

        }


    }
    else {





        res.status(401).json({ authenticated: false, msg: "Not authorized  user " })
        console.log("wrong password")

    }






}
export const AuthenticateToken = async (req: Request, res: Response) => {
    const token = req.body.token;

    console.log(token)

    try {
        const verified = jwt.verify(token, "i hve a secret")

        //@ts-ignore
        console.log(verified.id)
        const admins = await appDataSource.getRepository(Admins).findOne({
            where: {

                //@ts-ignore
                admin_user_id: verified.id
            }
        })
        res.json({
            verified: true,
            user: verified,
            admins: admins
        })


    } catch (error) {
        res.json({
            verified: false,
            user: null
        })



    }







    // res.send(verified)



}




export const RefreshToken = async (req: Request, res: Response) => {

    console.log("trying to refresh a token" + req.params.id)

    const id: string = req.params.id;

    try {

        const authenticated_user = await appDataSource.getRepository(Login).findOne({

            //@ts-ignore
            where: {
                //@ts-ignore
                login_id: id
            }
            , relations: {
                alumni: true
            }
        })



        if (authenticated_user != null) {
            console.log("we have the authenticated user " + authenticated_user.login_email)

            console.log(authenticated_user.alumni != null ? "is alumni " : "not alumni")

            const accessToken = jwt.sign({
                id: authenticated_user?.login_id,
                name: authenticated_user?.login_name,
                contact: authenticated_user?.login_contact,
                email: authenticated_user?.login_email,
                role: authenticated_user?.login_role,
                location: authenticated_user?.login_location,
                alumni: authenticated_user?.alumni
            }, "i hve a secret", { expiresIn: "1h" })
            console.log("this is the access token" + accessToken)



            res.json({
                authenticated: true, msg: "refresh successfull", role: authenticated_user?.login_role, accessToken: accessToken,
            })
        }
        else {
            console.log("we do not have an authenticated user")
            res.json({
                verified: false,
                user: null
            })

        }





    } catch (error) {
        res.json({
            verified: false,
            user: null
        })



    }

}

export const ResetPassword = async (req: Request, res: Response) => {
    console.log("resetting password")
    console.log(req.body)
    if (req.body.reset_email == null || req.body.reset_password == null) {
        res.json({ msg: "User not found", reset: false })

    }
    else {
        try {
            const hashed_password = await encryptPassword(req.body.reset_password)
            console.log(hashed_password)

            const password_reset = await appDataSource.createQueryBuilder()
                .update(Login)
                .set({ login_password: hashed_password })
                .where("login_email =:reset_email", { reset_email: req.body.reset_email })
                .execute()

            password_reset.affected == 0 ? res.json({ msg: "unable to reset, check your email", reset: false }) :
                res.json({ msg: "password reset Sucessfully", reset: true })

        } catch (error) {
            console.log(error)
            res.json({ msg: "unable to reset password", reset: false })

        }
    }


}




export const ResetEmail = async (req: Request, res: Response) => {

    console.log("resetting email")
    console.log(req.body)
    console.log(req.params)
    try {
        const email_reset = await appDataSource.createQueryBuilder()
            .update(Login)
            .set({ login_email: req.body.new_email })
            .where("login_id =:id", { id: req.params.id })
            .execute()

        email_reset.affected == 0 ? res.json({ msg: "unable to reset, try again", reset: false }) :
            res.json({ msg: "Email reset Sucessfully", reset: true })

    } catch (error) {
        console.log(error)
        res.json({ msg: "unable to reset email", reset: false })

    }



}

export const getUser = async (req: Request, res: Response) => {
    console.log("Getting a single user" + req.params.id)
    const user = await appDataSource.getRepository(Login).findOne({
        //@ts-ignore
        where: {

            login_id: req.params.id
        },
        relations: {
            alumni: true,
            admins: true

        }
    })
    res.send(user)


}

export const makeSchoolAdmin = async (req: Request, res: Response) => {

    console.log("making a user a school admin")
    console.log(req.body)
    try {

        await appDataSource.getRepository(Admins).save(req.body)

        res.json({ msg: "user made admin successfully", created: true })

    } catch (error) {
        console.log(error)
        res.json({ msg: "unable to make user school admin", created: false })

    }



}


export const DeleteUser = async (req: Request, res: Response) => {

    console.log("deleting a user")
    const idToDelete: any = req.params.id
    try {
        const deleted_user = await appDataSource.getRepository(Login).delete({
            login_id: idToDelete
        })
        res.json({ msg: "user deleted Successfully", deleted: true })


    } catch (error) {
        console.log(error)
        res.json({ msg: "unable to delete user", deleted: false })

    }



}


