import { AppError } from "../utils/appError.js"


export const emailToken = async(req,res,next)=>{
    const isExist = await userModel.findOne({email})
    if(isExist){
        jwt.sign({ email: req.params.email }, process.env.JWT_KEY)
        next()
    }else{
        next(new AppError("no user with this email" , 401))
    }
} 