import { Router } from "express";
import * as jobcontroller from './job.controller.js'
import { catchError } from "../../middleware/catchError.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addJobVal, paramsIdVal, updateJobVal } from "./job.vaildation.js";
import { uploadSingleFile } from "../../service/fileUploads/fileUploads.js";


const router = Router({mergeParams: true});

router.route('/')
.post(validation(addJobVal) ,auth ,catchError(jobcontroller.addJob))
.get(auth , catchError(jobcontroller.getAllApplications))

router.get('/getalljobs',auth ,catchError(jobcontroller.getAllJobs))
router.get("/getjobsforcompany",auth , catchError(jobcontroller.getJobForCompany))
router.get('/jobfilter' , auth , catchError(jobcontroller.jobFilter))

router.route('/:id')
.patch(validation(updateJobVal),auth ,catchError(jobcontroller.updateJob))
.delete(validation(paramsIdVal),auth ,catchError(jobcontroller.deleteJob))
.post(auth , uploadSingleFile("userResume") ,catchError(jobcontroller.ApplyForJob))



export default router;
