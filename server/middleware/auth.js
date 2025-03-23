import jwt from 'jsonwebtoken';

const auth = async(request, response, next) => {
  try {
    const token = request.cookies.accessToken || request?.header?.authorization?.split(" ")[1];
    // console.log("token",token)

    if (!token){
        return response.json(401).json({
            message :"provide Token"

        })

    }

    const decode =  await jwt.verify(token,Process.env.SECRET_KEY)
  console.log("decode", decode)





  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

export default auth;