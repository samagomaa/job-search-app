import { Schema, Types, model  } from "mongoose";


const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    numberOfEmployees: String,
    companyEmail: {
        type: String,
        unique: true
    },
    companyHR:{     
        type: Types.ObjectId,
        ref: "user",
        required: true
    }
} , {timestamps:true})

export const companyModel = model("company" , companySchema)