import { Schema, model } from "mongoose";
import { roles } from "../../src/common/constant/role.constant.js";
import { status } from "../../src/common/constant/status.constant.js";

const userSchema = new Schema({
    fristName:{
        type:String,
        required : true,
        trim: true, //to make no space
        lowercase : true
    },
    LastName:{
        type:String,
        required : true,
        trim: true, //to make no space
        lowercase : true
    },
    email:{
        type: String,
        required: true,
        unique : true,
        trim: true
    },
    recoveryEmail :String,
    password:{
        type: String,
        required: true
    },
    mobileNumber :{
        type:String,
        required: true,
        unique: true
    },
    DOB : {
        type: String,
        required:true
    },
    role : {
        type: String,
        enum : Object.values(roles),
        default : roles.USER
    },
    status: {
        type: String,
        enum : Object.values(status),
        default : status.OFFLINE
    }
} , {timestamps:true})

//virtual
userSchema.virtual("userName").get( function(){
    return this.fristName + ' ' + this.LastName
})

export const userModel = model('user' , userSchema)