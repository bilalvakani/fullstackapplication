
const generateRefreshToken = async() => {
        const token  = await jwt.sign({id:userId},
        process.env.SECRET_KEY,
        {expiresIn:'7d'}
    )
    return token
  
}

export default generateRefreshToken