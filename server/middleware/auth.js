
const auth = (request,response,next) => {
  try {
    const token  = request.cookies.accessToken
  } catch (error) {
    return response.status(500).json({
        message:error.message||error,
        error:true,
        success:false

    })
    
  }
}

export default auth