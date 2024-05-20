import mongoose from "mongoose";

export const connectDB = async ()=>{
    return await mongoose.connect(process.env.MONGOO_URL)
    .then(()=>{
        console.log("datase connected");
    })
    .catch((err)=>{
        console.log("fail to connect to db" , err);
    });
}