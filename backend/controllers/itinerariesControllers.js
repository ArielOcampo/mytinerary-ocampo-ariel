const itineraries = require("../models/itinerary")

const itinerariesControllers = {
  getItineraries: async (req, res) => {
    let itinerary
    let error = null
    try {
      itinerary = await itineraries.find().populate('city')
    } catch (err) { error = err }
    res.json({
      response: error ? 'ERROR' : { itinerary },
      succes: error ? false : true,
      error: error
    })
  },
  getItinerary: async (req, res) => {
    const id = req.params.id
    let itinerary
    let error = null
    try {
      itinerary = await itineraries.findOne({ _id: id }).populate('comments.user', { firstName: 1, userPhoto: 1 })
    } catch (err) {
      error = err
      console.log(error)
    }
    res.json({
      response: error ? 'ERROR' : itinerary,
      succes: error ? false : true,
      error: error
    })
  },
  addItinerary: async (req, res) => {
    const { image, itinerary, creator, price, duration, hashtags, likes, activities, city } = req.body
    let Itinerary
    let error = null
    try {
      Itinerary = await new itineraries({
        image: image,
        itinerary: itinerary,
        creator: creator,
        price: price,
        duration: duration,
        hashtags: hashtags,
        likes: likes,
        activities: activities,
        city: city
      }).save()

    }
    catch (err) { error = err }
    res.json({
      response: error ? 'ERROR' : Itinerary,
      succes: error ? false : true,
      error: error

    })
  },
  modifyItinerary: async (req, res) => {
    const id = req.params.id
    const itinerary = req.body
    let itinerarydb
    let error = null
    try {
      itinerarydb = await itineraries.findOneAndUpdate({ _id: id }, itinerary, { new: true })
    } catch (err) { error = err }
    res.json({
      response: error ? 'ERROR' : itinerarydb,
      succes: error ? false : true,
      error: error
    })
  },
  removeItinerary: async (req, res) => {
    const id = req.params.id
    let itinerary
    let error = null
    try {
      itinerary = await itineraries.findOneAndDelete({ _id: id })
    } catch (err) { error = err }
    res.json({
      response: error ? 'ERROR' : itinerary,
      succes: error ? false : true,
      error: error
    })
  },

  getItinerariesById: async (req, res) => {
    const id = req.params.id
    let itinerary
    let error = null
    try {
      itinerary = await itineraries.find({ city: id })
    } catch (err) {
      error = err
    }
    res.json({
      response: error ? 'ERROR' : (itinerary),
      success: error ? false : true,
      error: error
    })
  },
  likeDislike: async (req, res) => {
    const id = req.params.id
    const user = req.user.id

    await itineraries.findOne({ _id: id })

      .then((itinerary) => {

        if (itinerary.likes.includes(user)) {
          itineraries.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })
            .then((response) => res.json({ success: true, response: response.likes }))
            .catch((error) => console.log(error))
        } else {
          itineraries.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })
            .then((response) => res.json({ success: true, response: response.likes }))
            .catch((error) => console.log(error))
        }
      })
      .catch((error) => res.json({ success: false, response: error }))
  },
}

module.exports = itinerariesControllers