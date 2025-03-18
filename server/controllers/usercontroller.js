// import sendEmail from "../config/sendEmail";
import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

// register user controller
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
// verify email controller
export async function verifyEmailController(request,response){
    try{
        const {code}  = request.body

        const user  = await UserModel.findOne({_id : code})

        if (!user){
            return response.status(400).json({
                message:"Invalid code",
                error:true,
                success:false
         } )

        }

        const update = await UserModel.updateOne({_id:code},
            {verify_email:true})
            return response.json({
                message:"Email verified successfully",
                success:true,
                error:false,
            })

    }
    catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        });
    }
}

// login Api create 
export async function loginController(request,response){
try {
    const {email,password} = request.body

    if (!email||!password){
        return response.status(400).json({
            message:"provide email,password",
            error:true,
            success:false
        })
    }





    const user = await UserModel.findOne({email})

    if (!user){
        return response.status(400).json({
            message:"User not found",
            error:true,
            success:false
        });
    }
    if (user.status !== "Active"){
            return response.status(400).json({
                message:"contact to admmin",
                error:true,
                success:false
            })
    }


    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword){
        return response.status(400).json({
            message:"Invalid password",
            error:true,
            success:false
        });
    }

    const acceessToken  = await generatedAccessToken(user._id)
    const refreshToken = await generateRefreshToken(user._id)


    const cookiesOption ={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }

    response.cookie('acceessToken',acceessToken,cookiesOption)
    response.cookie('refreshToken',refreshToken,cookiesOption)

    return response.json({
        message :"Login sucessfully",
        error:false,
        success:true,
        data:{
            acceessToken,
            refreshToken
        }
    })



    
} catch (error) {
    return response.status(500).json({
        message:error.message||error,
        error:true,
        success:false
    });
}
}

//  LOGUT API

export  async function logoutController(request,response){
    try {
        const cookiesOption ={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
    
        response.clearCookie("acceessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)

        return response.json({
            message:"Logout Succeessfully",
            error:false,
            success:true

        })

        
    } catch (error) {
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false

        })
        
    }
}