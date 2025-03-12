import UserModel from "../models/usermodel";

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




    }
    catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        });
    }
}