import { Router } from "express"
import { InstitutionAdd, deleteSchool, getSchool, getSchools } from "../controller/institution.controller"


export const instRouter = Router()

instRouter.post("/admin/addinstitution", InstitutionAdd)
instRouter.get("/admin/institutions", getSchools)
instRouter.get("/admin/institutions/:id", getSchool)
instRouter.get("/institution/:id", deleteSchool)
