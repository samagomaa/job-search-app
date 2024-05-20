import { Router } from "express";
import * as usercontroller from './user.controller.js'
import { checkEmailExist } from "../../middleware/checkEmailExist.js";
import { hashPassword } from "../../middleware/hashPassword.js";
import { catchError } from "../../middleware/catchError.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { paramsIdVal, recoveryEmailVal, signInSchema, signUpSchema, updatePasswordVal, updateUserVal } from "./user.vaildation.js";

const router = Router();

router.post('/signup', validation(signUpSchema) , checkEmailExist , hashPassword ,catchError(usercontroller.signUp))
router.post('/signin',validation(signInSchema),catchError(usercontroller.signIn))
router.delete('/deleteaccount/:id',validation(paramsIdVal), auth ,catchError(usercontroller.deleteAccount))
router.patch('/updateaccount/:id', validation(updateUserVal) ,  auth ,catchError(usercontroller.updateAccount))
router.get('/getuserdata', auth ,catchError(usercontroller.getOwnerData))
router.get('/getothersdata/:id', validation(paramsIdVal), auth ,catchError(usercontroller.getOthersData))
router.patch('/updatepassword/:id', validation(paramsIdVal) , auth , validation(updatePasswordVal) , catchError(usercontroller.updatePassword))
router.get('/getAllAccounts', auth , validation(recoveryEmailVal) , catchError(usercontroller.getAllAccounts))

export default router;