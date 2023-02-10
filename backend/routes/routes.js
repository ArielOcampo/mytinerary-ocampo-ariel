const Router = require("express").Router();
//CITIES
const citiesControllers = require("../controllers/citiesControllers");
const { getCities, getOneCity, addCity, modifyCity, removeCity } =
  citiesControllers;
//ITINERARIES
const itinerariesControllers = require("../controllers/itinerariesControllers");
const {
  getItineraries,
  getItinerary,
  addItinerary,
  modifyItinerary,
  removeItinerary,
  getItinerariesById,
  likeDislike,
} = itinerariesControllers;
//USERS
const userControllers = require("../controllers/userControllers");
const { signUpUsers, loginUser, verifyEmail, verifyToken } = userControllers;
//PASSPORT
const passport = require("../config/passport");
const validator = require("../config/validator");
//ACTIVITIES
const activitiesControllers = require("../controllers/activitiesControllers");
const {
  getActivities,
  uploadActivity,
  deleteAct,
  modifyAct,
  oneActivity,
  findActFromTin,
} = activitiesControllers;
//COMMENTS
const commentsControllers = require("../controllers/commentsControllers");
const { addComment, modifyComment, deleteComment } = commentsControllers;

//*******ROUTES*********
//CITIES
Router.route("/cities").get(getCities).post(addCity);

Router.route("/cities/:id").delete(removeCity).put(modifyCity).get(getOneCity);

//ITINERARIES
Router.route("/itineraries").get(getItineraries).post(addItinerary);

Router.route("/itineraries/:id")
  .delete(removeItinerary)
  .put(modifyItinerary)
  .get(getItinerary);

Router.route("/itinerariesbycity/:id").get(getItinerariesById);

Router.route("/itineraries/like/:id").put(
  passport.authenticate("jwt", { session: false }),
  likeDislike
);
//USERS
Router.route("/signUp").post(validator, signUpUsers);

Router.route("/login").post(loginUser);
//EMAIL VERIFY
Router.route("/verify/:string").get(verifyEmail);
//LOGIN TOKEN
Router.route("/logintoken").get(
  passport.authenticate("jwt", { session: false }),
  verifyToken
);
//ACTIVITY
Router.route("/activities").get(getActivities).post(uploadActivity);

Router.route("/activities/:id")
  .delete(deleteAct)
  .put(modifyAct)
  .get(oneActivity);

Router.route("/activitiesfromttineraries").post(findActFromTin);
//COMMENTS
Router.route("/comments")
  .post(passport.authenticate("jwt", { session: false }), addComment)
  .put(passport.authenticate("jwt", { session: false }), modifyComment);
Router.route("/comments/:id").post(
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = Router;
