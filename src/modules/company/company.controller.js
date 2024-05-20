import { jobModel } from "../../../DB/models/job.model.js";
import { companyModel } from "../../../DB/models/company.model.js";
import { appModel } from "../../../DB/models/application.model.js";
import { ApiFeaturs } from "../../utils/apifeaturs.js";


//add Company
const addCompany = async (req, res, next) => {
    if (req.user.userRole == 'Company_HR') {
        const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;
        const company = {
            companyName,
            description,
            industry,
            address,
            numberOfEmployees,
            companyEmail,
            companyHR: req.user.userId
        }
        const newCompany = new companyModel(company)
        await newCompany.save()
        res.status(200).json({
            success: true,
            message: "company added successfully",
            newCompany: newCompany
        })
    } else {
        return res.status(401).json({ message: "only company HR can add company" })
    }
}


//update company
const updateCompany = async (req, res, next) => {
    const isCompanyExist = await companyModel.findById(req.params.id)
    if (isCompanyExist) {
        if (req.user.userId == isCompanyExist.companyHR && req.user.userRole == "Company_HR") {
            const identifier = req.body;
            const updatedCompany = await companyModel.findByIdAndUpdate(req.params.id, identifier, { new: true })
            res.status(200).json({ success: true, updatedCompany })
        } else {
            res.status(401).json({ message: "Only the owner can update the account" })
        }
    } else {
        res.status(404).json({ message: "company not found" })
    }
}

//Delete company data
const deleteCompany = async (req, res, next) => {
    const isCompanyExist = await companyModel.findById(req.params.id)
    if (isCompanyExist) {
        if (req.user.userId == isCompanyExist.companyHR && req.user.userRole == "Company_HR") {
            await companyModel.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: true , message:"company deleted successfully"})
        } else {
            res.status(401).json({ message: "Only the owner can delete the account" })
        }
    } else {
        res.status(404).json({ message: "company not found" })
    }
}


//get company profile data
const getCompanyProfile = async (req, res, next) => {
    // get companyId from params 
    const company = await companyModel.findById(req.params.id)
    if (!company) {
        return res.status(404).json({ message: "company not found" })
    } else {
        //return all jobs related to this company
        let jobs = await jobModel.find({ addedBy: company.companyHR })
        if (jobs.length) {
            return res.status(200).json({ success: true, jobs })
        } else {
            return res.status(200).json({ messages: "there are no jobs in this company" })
        }
    }
}


//search for company
const searchForCompany = async (req, res, next) => {
    let apiFeatures = new ApiFeaturs(companyModel.find() , req.query).search()
    let companies = await apiFeatures.mongooseQuery
    if (!companies) {
        res.status(404).json({ message: "no companies found" })
    } else {
        if (req.user.userRole == "Company_HR" || req.user.userRole == "User") {
            res.status(200).json({ success: true, companies })
        }
    }
}






export {
    addCompany,
    updateCompany,
    deleteCompany,
    getCompanyProfile,
    searchForCompany,
}