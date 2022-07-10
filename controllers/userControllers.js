const User = require("../models/userModel")
const bcryptjs = require('bcryptjs')
const crypto = require('crypto');
const sendVerificationMail = require('../controllers/sendVerificationMail')
const jwt = require('jsonwebtoken')
const urlHerokuFront = "https://mytinerary-ocampoa.herokuapp.com/"
const urlLocal = "http://localhost:4000/"
const userControllers = {


  signUpUsers: async (req, res) => {
    let { firstName, lastName, email, password, userPhoto, country, from } = req.body.userData

    try {
      const userExist = await User.findOne({ email }) //buscamos por email
      if (!userExist) { //si NO existe el usuario
        const hashWord = bcryptjs.hashSync(password, 10) //hasheo la contraseña
        const verification = false //por defecto la verificacion la colocamos como false
        const uniqueString = crypto.randomBytes(15).toString('hex')
        const newUser = await new User({
          firstName,
          lastName,
          email,
          password: [hashWord],
          userPhoto,
          country,
          from: [from],
          verification,
          uniqueString: uniqueString
        })
        if (from === "form-Signup") { //si la data viene del formulario
          //ACLARACION: ahora el if/else tienen la misma data
          //pero van a cambiar cuando enviemos correo de verificacion
          await newUser.save()
          await sendVerificationMail(email, uniqueString)
          res.json({
            success: true,
            from: from,
            message: `check ${email} and finish your SIGN UP!`
          })
        } else { //si la data viene de una red social
          await newUser.save()
          // await sendVerificationMail(email, uniqueString)
          res.json({
            success: true,
            from: from,
            message: `you SIGNED UP by ${from}! now LOG IN!`
          })
        }
      } else { //si existe el usuario, significa que al menos tiene un registro
        //hay que chequear si coincide la forma de RE-REGISTRO con la ya REGISTRADA
        //si coincide se tiene que cumplir la siquiente condicion:
        if (userExist.from.indexOf(from) !== -1) { //coincide la forma de registro ACTUAL con alguna ya EXISTENTE en mi bd
          //del usuario que encontró
          //busco en la propiedad FROM
          //el indice que coincide con el FROM del cual el usuario quiere "volver" a registrarse
          //si ese indice EXISTE ==> el usuario ya está registrado DE ESTA FORMA y hay que mandarlo a loguearse
          //entonces si el indice de from es cualquier numero que no sea -1 significa que ya existe el usuario y NO DEBEMOS PERMITIRLE volver a registrarse
          res.json({ //devolvemos la respuesta
            success: false,
            from: from,
            message: `${email} has been registered, please LOG IN!`
          })
          //si no coincide, se tiene que cumplir esta otra:                
        } else {
          //si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA (nuevo registro con google)
          //pero ya tiene AL MENOS UN registro (facebook y form)
          const hashWord = bcryptjs.hashSync(password, 10)
          userExist.password.push(hashWord)
          userExist.verification = true
          userExist.from.push(from)
          await userExist.save()
          res.json({
            success: true,
            from: from,
            message: ` ${firstName} you are ready to Login!`
          })
        }
      }
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        from: from,
        message: 'ERROR'
      })
    }

  },




  loginUser: async (req, res) => {
    //console.log('REQ BODY')
    //console.log(req.body)
    const { email, password, from } = req.body.logedUser
    try {
      const loginUser = await User.findOne({ email }) //buscamos por email
      if (!loginUser) { //si NO existe el usuario
        res.json({
          success: false,
          from: 'no from',
          message: `${email} has no account, please SIGN UP!`
        })
      } else { //si existe el usuario
        let checkedWord = loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))

        //filtramos en el array de contraseñas hasheadas si coincide la contraseña 
        if (from === "form-Signup") { //si fue registrado por nuestro formulario
          if (loginUser.verification === false) {
            res.json({
              success: false,
              from: from,
              message: `check ${email} to confirm your SIGN UP!`
            })


          }
          else if (checkedWord.length > 0) { //si hay coincidencias
            const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
              id: loginUser._id,
              email: loginUser.email,
              firstName: loginUser.firstName,
              userPhoto: loginUser.userPhoto,
              from: loginUser.from,
              success: true
            }
            await loginUser.save()
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })


            res.json({
              response: { token, userData },
              success: true,
              from: from,
              message: `welcome back ${userData.firstName}!`
            })
          } else { //si no hay coincidencias
            res.json({
              success: false,
              from: from,
              message: `verify your password!`
            })
          }
        } else { //si fue registrado por redes sociales
          //ACLARACION: por ahora es igual al anterior
          if (checkedWord.length > 0) { //si hay coincidencias
            const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
              id: loginUser._id,
              email: loginUser.email,
              firstName: loginUser.firstName,
              userPhoto: loginUser.userPhoto,
              from: loginUser.from
            }
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            await loginUser.save()
            res.json({
              response: { token, userData },
              success: true,
              from: from,
              message: `welcome back ${userData.firstName}!`
            })
          } else { //si no hay coincidencias
            res.json({
              success: false,
              from: from,
              message: `verify your mail or password!`
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        from: from,
        message: 'ERROR'
      })
    }
  },
  verifyEmail: async (req, res) => {
    const { string } = req.params
    const user = await User.findOne({ uniqueString: string })
    //console.log(user)
    if (user) {
      user.verification = true
      await user.save()
      res.redirect(`${urlHerokuFront}`)
    }
    else {
      res.json({
        success: false,
        message: `email has not account yet!`
      })
    }
  },
  verifyToken: (req, res) => {


    if (req.user) {

      res.json({
        success: true,
        response: { id: req.user.id, firstName: req.user.firstName, email: req.user.email, UserPhoto: req.user.userPhoto, from: "token" },
        message: "Welcome backsadasd " + req.user.firstName,
      })

    } else {
      res.json({
        success: false,
        message: "Please login again"
      })
    }
  }
}

module.exports = userControllers