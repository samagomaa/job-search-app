import { Router } from "express";
import * as companycontroller from './company.controller.js'
import { catchError } from "../../middleware/catchError.js";
import { auth } from "../../middleware/auth.js";
import jobRouter from '../job/job.routes.js'
import { validation } from "../../middleware/validation.js";
import { addCompanyVal, paramsIdVal, updateCompanyVal } from "./company.vaildation.js";


const router = Router();

router.use('/:jobID/applications', jobRouter)

router.route('/')
.post(auth , validation(addCompanyVal) ,catchError(companycontroller.addCompany))
.get(auth ,catchError(companycontroller.searchForCompany))


router.route('/:id')
.patch( validation(updateCompanyVal) ,auth ,catchError(companycontroller.updateCompany))
.delete( validation(paramsIdVal) , auth ,catchError(companycontroller.deleteCompany))
.get(validation(paramsIdVal) , auth ,catchError(companycontroller.getCompanyProfile))



export default router;