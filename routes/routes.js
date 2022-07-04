const Router = require('express').Router();
//CITIES
const citiesControllers = require('../controllers/citiesControllers')
const { getCities, getOneCity, addCity, modifyCity, removeCity } = citiesControllers
//ITINERARIES
const itinerariesControllers = require('../controllers/itinerariesControllers')
const { getItineraries, getItinerary, addItinerary, modifyItinerary, removeItinerary, getItinerariesById } = itinerariesControllers
//USERS
const userControllers = require('../controllers/userControllers')
const { signUpUsers, loginUser, verifyEmail, verifyToken } = userControllers
//PASSPORT
const passport = require('../config/passport')
const validator = require('../config/validator')

//*******ROUTES*********
//CITIES
Router.route('/cities')
  .get(getCities)
  .post(addCity)

Router.route('/cities/:id')
  .delete(removeCity)
  .put(modifyCity)
  .get(getOneCity)

//ITINERARIES
Router.route('/itineraries')
  .get(getItineraries)
  .post(addItinerary)

Router.route('/itineraries/:id')
  .delete(removeItinerary)
  .put(modifyItinerary)
  .get(getItinerary)

Router.route('/itinerariesbycity/:id')
  .get(getItinerariesById)

//USERS
Router.route('/signUp')
  .post(validator, signUpUsers)

Router.route('/login')
  .post(loginUser)
//EMAIL VERIFY
Router.route("/verify/:string")
  .get(verifyEmail)
//LOGIN TOKEN
Router.route('/logintoken')
  .get(passport.authenticate('jwt', { session: false }), verifyToken)

module.exports = Router