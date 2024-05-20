import {connectDB} from '../DB/connection.js'
import { globalError } from './middleware/globalError.js'
import userRouter from './modules/user/user.routes.js'
import companyRouter from './modules/company/company.routes.js'
import jobRouter from './modules/job/job.routes.js'
import dotenv from 'dotenv'
import { AppError } from './utils/appError.js'
dotenv.config()


export const bootstrap = (app)=>{
    app.use('/api/v1/user' , userRouter);
    app.use('/api/v1/company' , companyRouter);
    app.use('/api/v1/job' , jobRouter);
    app.all('*' , (req,res,next)=>{next(new AppError(`invalid routing ${req.originalUrl}` , 400))})
    app.use(globalError)
    connectDB()
}

