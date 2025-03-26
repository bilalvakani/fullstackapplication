import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async(request, response, next) => {
  try {
    const token = request.cookies.accessToken || request?.header?.authorization?.split(" ")[1];
    // console.log("token",token)

    if (!token){
        return response.json(401).json({
            message :"provide Token"

        })

    }
    const decode =  await jwt.verify(token,process.env.SECRET_KEY)
  console.log("decode", decode)
   
  if (!decode){
    return  response.json(401).json
    ({
      message:"unauthorized access",
      error:true,
      success:false
    })
  }

  request.userId = decode.id
  next()




  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

export default auth;