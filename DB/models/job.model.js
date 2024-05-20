import { Schema, Types, model } from "mongoose";
import { workTime } from "../../src/common/constant/worktime.constant.js";
import { seniorityLevel } from "../../src/common/constant/seniorityLevel.constant.js";


const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
        lowercase:true
    },
    jobLocation: {
        type: String,
        required: true,
    },
    workingTime: {
        type: String,
        required: true,
        enum: Object.values(workTime),
        default: workTime.PART_TIME
    },
    seniorityLevel: {
        type: String,
        required: true,
        enum: Object.values(seniorityLevel),
        default: seniorityLevel.JUNIOR
    },
    jobDescription: String,
    technicalSkills:[{type:String , trim: true , lowercase:true}], //array of skills with type string
    softSkills:[{type:String , trim: true , lowercase:true}], 
    addedBy:{ //company_HR
        type: Types.ObjectId,
        ref:"user",
        required:true
    },
    companyId: { //company
        type: Types.ObjectId,
        ref:"company",
        required:true
    },
    companyName: String
}, { timestamps: true })


export const jobModel = model("job" , jobSchema)