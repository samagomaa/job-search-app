import mongoose from "mongoose"
import multer from "multer"

export const fileUpload = ()=>{
    const storage = multer.diskStorage({
        destination:(req,file,cd)=>{
            cd(null,'uploads/')
        },
        filename:(req,file,cd)=>{
            cd(null, new mongoose.Types.ObjectId + "-" + file.originalname)
        }
    })
    function fileFilter(req,file,cd){
        if(file.mimetype === "application/pdf"){
            cd(null,true)
        }else{
            cd(new AppErrorO('pdf only' , 401) , false)
        }
    }
    const upload = multer({storage,fileFilter})
    return upload
}

export const uploadSingleFile = fileName => fileUpload().single(fileName)
