const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const sendVerificationMail = async (email, string) => { //depende del mail que ingresa el usuario y el uniqueString que se crea con crypto

  const myOAuth2Client = new OAuth2(
    "915351353310-q8ga6v8c8j40s3s6h64mhok99dh1ct0e.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
  )

  myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESHTOKEN
  })
  console.log(process.env.GOOGLE_CLIENTID)
  const accessToken = myOAuth2Client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      type: "OAuth2",
      user: process.env.USER,
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      refreshToken: process.env.GOOGLE_REFRESHTOKEN,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false //para evitar que bloquee el antivirus
    }
  })

  let mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'verify account',
    html: `
            <a href=http://localhost:4000/api/verify/${string}>CLICK HERE!</a>
            <h3>to confirm!</h3>`
  }

  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log(`check ${email} to confirm your account`)
    }
  })
}

module.exports = sendVerificationMail