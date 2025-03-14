
const verifyEmailTemplate = (name,url) => {
  return`
  <div style="font-family: Arial, 'sans-serif';">
    <h2>Hi ${name}</h2>
    <p>Thanks for signing up with us blue moon shoes. To complete the registration process, please click on the link below:</p>
    <a href=${url} style="color:white;background : blue; margin-top:10px"> click here
    </a>
    <p>If you did not request this, please ignore this email.</p>
    <p>Thanks</p>`
}

export default verifyEmailTemplate