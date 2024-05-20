import { Schema, Types, model } from "mongoose";


const appSchema = new Schema({
    jobId: {
        type: Types.ObjectId,
        ref:"job"
    },
    userId: {
        type: Types.ObjectId,   //ID of the applier => company_HR
        ref : "user"
    },
    userTechSkills:[{type:String , trim: true , lowercase:true}],
    userSoftSkills:[{type:String , trim: true , lowercase:true}],
    userResume : String
})

appSchema.post('init' , function(doc) {
    doc.userResume = process.env.BASE_URL  + 'uploads/' + doc.userResume;
})

export const appModel = model("app" ,appSchema )