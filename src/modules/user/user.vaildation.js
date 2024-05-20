import joi from 'joi'


const signUpSchema = joi.object({
    fristName: joi.string().min(2).max(10).required(),
    LastName: joi.string().min(2).max(10).required(),
    email: joi.string().email().required(),
    recoveryEmail: joi.string().email(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    mobileNumber : joi.string().pattern(/^(\+02|002)?01(0|1|2|5)[0-9]{8}$/).required(),
    DOB : joi.string().pattern(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/).required(),
    role : joi.string().valid('user' , 'Company_HR')
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
})


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateUserVal = joi.object({
    id: joi.string().hex().length(24),
    fristName: joi.string().min(2).max(10),
    LastName: joi.string().min(2).max(10),
    email: joi.string().email(),
    recoveryEmail: joi.string().email(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    mobileNumber : joi.string().pattern(/^(\+02|002)?01(0|1|2|5)[0-9]{8}$/),
    DOB : joi.string().pattern(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
    role : joi.string().valid('user' , 'Company_HR')
})

const updatePasswordVal = joi.object({
    id: joi.string().hex().length(24),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    newpassword: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
})

const recoveryEmailVal = joi.object({
    recoveryEmail: joi.string().email().required(),
})

export {
    signInSchema,
    signUpSchema,
    paramsIdVal,
    updateUserVal,
    updatePasswordVal,
    recoveryEmailVal
}