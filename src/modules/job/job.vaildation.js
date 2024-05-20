import joi from 'joi'
import { workTime } from '../../common/constant/worktime.constant.js'
import { seniorityLevel } from '../../common/constant/seniorityLevel.constant.js'



const addJobVal = joi.object({
    jobTitle: joi.string().min(2).max(30).required(),
    jobLocation: joi.string().min(2).max(20).required(),
    workingTime: joi.string().valid(...Object.values(workTime)).required(),
    seniorityLevel: joi.string().valid(...Object.values(seniorityLevel)).required(),
    jobDescription:  joi.string().min(2).max(200).required(),
    technicalSkills:  joi.array().items(joi.string().required()),
    softSkills:  joi.array().items(joi.string().required()),
    companyId: joi.string().hex().length(24).required(),
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})

const updateJobVal = joi.object({
    id: joi.string().hex().length(24).required(),
    jobTitle: joi.string().min(2).max(30),
    jobLocation: joi.string().min(2).max(20),
    workingTime: joi.string().valid(...Object.values(workTime)),
    seniorityLevel: joi.string().valid(...Object.values(seniorityLevel)),
    jobDescription:  joi.string().min(2).max(200),
    technicalSkills:  joi.array().items(joi.string()),
    softSkills:  joi.array().items(joi.string()),
    companyId: joi.string().hex().length(24)
})


export {
    paramsIdVal,
    addJobVal,
    updateJobVal
}