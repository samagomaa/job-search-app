import { userModel } from "../../../DB/models/user.model.js";
import bcrypt from 'bcrypt'
import { AppError } from "../../utils/appError.js";
import jwt from 'jsonwebtoken'
//sign-up
const signUp = async (req,res,next)=>{
        const{fristName ,LastName , email , recoveryEmail , password , mobileNumber , DOB , role} = req.body;
        const user = {
            fristName ,
            LastName , 
            email , 
            recoveryEmail ,
            password , 
            mobileNumber,
            DOB,
            role
        }
        const newUser = await userModel.create(user)
        res.json({
            success: true,
            message:"user added successfully",
            newuser: newUser
        })
}

// sign in

const signIn = async (req,res,next)=>{
    const {password , email } = req.body
    const isExist = await userModel.findOne({email})
    if(isExist && bcrypt.compareSync(password , isExist.password) ){
        isExist.status = "online";
        let token = jwt.sign({ userId: isExist._id , userRole: isExist.role}, process.env.SECRET_KEY)
        await isExist.save(); 
        return res.status(200).json({ success:true ,message:"user logged in successfuly" , token})
    }else{
        return res.status(204).json({ success:false ,message:"password or email wrong..."})
    }
}

//update account
const updateAccount = async(req,res,next)=>{
    if(req.user.userId == req.params.id){
    const account = await userModel.findByIdAndUpdate(req.params.id , req.body , {new:true})
    !account && res.status(204).json({message:"user not found"})
    account && res.json({success: true , account})
    }else{
        res.status(401).json({message:"Only the owner can update the account"})
    }
}

//delete account
const deleteAccount = async(req,res,next)=>{
    if(req.user.userId == req.params.id){
        const account = await userModel.findByIdAndDelete(req.params.id)
    !account && res.status(204).json({message:"user not found"})
    account && res.json({success: true , account})
    }else{
        res.status(401).json({message:"Only the owner can delete the account"})
    }
}

//Get user account data 
const getOwnerData = async(req,res,next)=>{
    //useing userId from the token 
    const account = await userModel.findById(req.user.userId)
    !account && res.status(204).json({message:"user not found"})
    account && res.json({success: true , account})
}

//Get profile data for another user 
const getOthersData = async(req,res,next)=>{
    const account = await userModel.findById(req.params.id)
    !account && res.status(204).json({message:"user not found"})
    account && res.status(200).json({success: true , account})
}

//update password
const updatePassword = async(req,res,next)=>{
    if(req.user.userId == req.params.id){
    const account = await userModel.findByIdAndUpdate(req.params.id , {password:req.body.newPassword}  , {new:true})
    !account && res.status(204).json({message:"user not found"})
    account && res.status(200).json({success: true , account})
    }else{
        res.status(204).json({message:"Only the owner can update the password"})
    }
}

//Get all accounts associated to a specific recovery Email 
const getAllAccounts = async(req,res,next)=>{
    const account = await userModel.find({recoveryEmail:req.body.recoveryEmail})
    !account && res.status(204).json({message:"no accounts found"})
    account && res.json({success: true , account})
}



export{
    deleteAccount,
    signIn,
    signUp,
    updateAccount,
    getOwnerData,
    getOthersData,
    updatePassword,
    getAllAccounts
}