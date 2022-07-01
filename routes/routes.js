const Router = require('express').Router();

const citiesControllers = require('../controllers/citiesControllers')
const { getCities, getOneCity, addCity, modifyCity, removeCity } = citiesControllers

const itinerariesControllers = require('../controllers/itinerariesControllers')
const { getItineraries, getItinerary, addItinerary, modifyItinerary, removeItinerary, getItinerariesById } = itinerariesControllers

const userControllers = require('../controllers/userControllers')
const { signUpUsers, loginUser, verifyEmail } = userControllers

const validator = require('../config/validator')


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

Router.route("/verify/:string")
  .get(verifyEmail)

module.exports = Router