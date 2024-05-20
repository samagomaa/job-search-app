import joi from 'joi'


const addCompanyVal = joi.object({
    companyName: joi.string().min(2).max(15).required(),
    industry: joi.string().min(2).max(10).required(),
    address: joi.string().min(2).max(20).required(),
    description: joi.string().min(5).max(500).required(),
    companyEmail: joi.string().email().required(),
    numberOfEmployees: joi.string().pattern(/^[0-9]*-[0-9]*$/)
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateCompanyVal = joi.object({
    id: joi.string().hex().length(24),
    companyName: joi.string().min(2).max(15),
    industry: joi.string().min(2).max(10),
    address: joi.string().min(2).max(20),
    description: joi.string().min(5).max(500),
    companyEmail: joi.string().email(),
    numberOfEmployees: joi.string().pattern(/^[0-9]*-[0-9]*$/)
})


export {
    paramsIdVal,
    addCompanyVal,
    updateCompanyVal
}