// import sendEmail from "../config/sendEmail";
import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerUserController(request,response){
    try{
       const{name,email,password}=request.body

       if (!name || !email || !password){
        return response.status(400).json({
            message:"All fields are required",
            error:true,
            success:false
        });
       }

       const user = await UserModel.findOne({ email })

       if(user){
        return response.json({
            message:"User already exists",
            error:true,
            success:false
        })
       }

       const salt = bcrypt.genSaltSync(10);
         const hashPassword = bcrypt.hashSync(password, salt);

        //  saved in database
        const payload={
            name,
            email,
            password:hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code${save?._id}`

        const VerifyEmail = await sendEmail({
            sendTO :email,
            subject:"Email Verification",
            html: verifyEmailTemplate( {
                name,
                url:VerifyEmailUrl
            })
        })
        return response.json({
            message:"User registered successfully",
            success:true,
            error:false,
            data:save
        });
    }
    catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        });
    }
}