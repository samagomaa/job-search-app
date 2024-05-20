import { userModel } from "../../../DB/models/user.model.js";
import { jobModel } from "../../../DB/models/job.model.js";
import { companyModel } from "../../../DB/models/company.model.js";
import { appModel } from "../../../DB/models/application.model.js";
import { ApiFeaturs } from "../../utils/apifeaturs.js";

//add Company
const addJob = async (req, res, next) => {
    if (req.user.userRole == "Company_HR") {
        const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills, companyId } = req.body;
        const company = await companyModel.findById(companyId);
        const job = {
            jobTitle,
            jobLocation,
            workingTime,
            seniorityLevel,
            jobDescription,
            technicalSkills,
            softSkills,
            addedBy: req.user.userId,
            companyId,
            companyName: company.companyName
        }
        const newJob = new jobModel(job)
        await newJob.save()
        res.status(200).json({
            success: true,
            message: "job added successfully",
            newJob: newJob
        })
    } else {
        return res.json({ message: "only company HR can add job"  , company})
    }
}

//update job
const updateJob = async (req, res, next) => {
    const isJobExist = await jobModel.findById(req.params.id)
    if (isJobExist) {
        if (req.user.userId == isJobExist.addedBy && req.user.userRole == "Company_HR") {
            const identifier = req.body;
            const updatedJob = await jobModel.findByIdAndUpdate(req.params.id, identifier, { new: true })
            res.status(200).json({ success: true, updatedJob })
        } else {
            res.status(401).json({ message: "Only the owner can update the job" })
        }
    } else {
        res.status(204).json({ message: "Job not found" })
    }
}

//delete job
const deleteJob = async (req, res, next) => {
    const isJobExist = await jobModel.findById(req.params.id)
    if (isJobExist) {
        if (req.user.userId == isJobExist.addedBy && req.user.userRole == "Company_HR") {
            await jobModel.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: true })
        } else {
            res.status(401).json({ message: "Only the owner can delete this job" })
        }
    } else {
        res.status(204).json({ message: "Job not found" })
    }
}

//Get all Jobs with their company’s information.
const getAllJobs = async (req, res, next) => {
    let apiFeaturs = new ApiFeaturs(jobModel.find(), req.query).paggination()
    if (req.user.userRole == "Company_HR") { //apply authorization with the role (Company_HR )
        const jobs = await apiFeaturs.mongooseQuery.populate('companyId') //populate all the company info
        res.status(200).json({ success: true, pages: apiFeaturs.pageNum, jobs })
    } else {//apply authorization with the role (user)
        const jobs = await apiFeaturs.mongooseQuery.populate('companyId', "companyName -_id")//populate just the company name
        res.status(200).json({ success: true, pages: apiFeaturs.pageNum, jobs })
    }

}


//Get all Jobs for a specific company.
const getJobForCompany = async (req, res, next) => {
    let apiFeatures = new ApiFeaturs(jobModel.find() , req.query).search()
        //search by company name from req.query in the job model to get all company's jobs
            if (req.user.userRole == "Company_HR") { //apply authorization with the role (Company_HR )
                let jobs = await apiFeatures.mongooseQuery.populate('companyId')
                res.status(200).json({ success: true,  jobs })
            } else {//apply authorization with the role (user)
                let jobs = await apiFeatures.mongooseQuery.populate('companyId', "companyName description industry address numberOfEmployees  companyEmail -_id")
                res.status(200).json({ success: true,  jobs })
            }
}


//job filter
const jobFilter = async (req, res, next) => {
    let apiFeatures = new ApiFeaturs(jobModel.find() , req.query).filteration()
    if(req.user.userRole == "Company_HR"){
        let jobs = await apiFeatures.mongooseQuery.populate("companyId")
        res.json(jobs)
    }else{
        let jobs = await apiFeatures.mongooseQuery.populate('companyId', "description industry address numberOfEmployees  companyEmail -_id")
                res.status(200).json({ success: true,  jobs })
    }
}

//Apply to Job
const ApplyForJob = async (req, res, next) => {
    if (req.user.userRole == "User") {
        req.body.userResume = req.file.filename //get the file name from files
        req.body.userId = req.user.userId //get user id from the token
        req.body.jobId = req.params.id //get job id from params 
        const newApplication = new appModel(req.body)
        await newApplication.save()
        res.status(200).json(newApplication)
    } else {
        res.status(401).json({ message: "only users can apply for this job" })
    }

}

//get all applications for specific job
const getAllApplications = async (req, res, next) => {
    let applications = await appModel.find({ jobId: req.params.jobID} , ('-userId'))
    if (applications.length == 0) {
        res.status(200).json("there are no applications yet")
    } else {
        res.status(200).json({ success: true, applications })
    }
}

export {
    addJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobForCompany,
    jobFilter,
    ApplyForJob,
    getAllApplications
}