
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


const generatedAccessToken = async(userId) => {
    const token  = await jwt.sign({id:userId},
    process.env.SECRET_KEY,
    {expiresIn:'5h'}
)
return token
}

export default generatedAccessToken