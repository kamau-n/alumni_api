import { Express } from "express";
import { Router } from "express";
import { AuthenticateToken, DeleteUser, RefreshToken, ResetEmail, ResetPassword, getUser, makeSchoolAdmin, signIn, updateUser } from "../controller/signin.controller";
import { getUsers, signUp } from "../controller/signupcontroller";
import { upload } from "../middlewares/imageupload.middleware";
import {requireAuthentication } from "../middlewares/authentication/authenticated.middleware";




const authRouter = Router()

authRouter.post("/login", signIn)

authRouter.post("/register", upload, signUp)
authRouter.post("/authenticate", AuthenticateToken)
authRouter.get("/refreshtoken/:id", RefreshToken)
authRouter.get("/users", getUsers)
authRouter.post("/passwordreset", ResetPassword)
authRouter.post("/resetemail/:id", ResetEmail)
authRouter.delete("/deleteuser/:id", DeleteUser)
authRouter.get("/user/:id", getUser)

authRouter.post("/makeadmin", makeSchoolAdmin)
authRouter.post("/user/update",updateUser)


export default authRouter;