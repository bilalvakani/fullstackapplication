import UserModel from "../models/usermodel.js"

const generateRefreshToken = async() => {
        const token  = await jwt.sign({id:userId},
        process.env.SECRET_KEY,
        {expiresIn:'7d'}
    )

const updateRefreshTokenUser = await UserModel.updateone(
    {_id:userId},
    {
        refresh_token : token
    }

)
    return token
  
}

export default generateRefreshToken