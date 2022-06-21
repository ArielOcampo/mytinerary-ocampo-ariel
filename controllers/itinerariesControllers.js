const itineraries = require("../models/itinerary")

const itinerariesControllers = {
  getItineraries: async (req, res) => {
    let itinerary
    let error = null
    try {
      itinerary = await itineraries.find()
    } catch (err) { error = err }
    res.json({
      response: error ? 'ERROR' : { itinerary },
      succes: error ? false : true,
      error: error
    })
  },
  getItinerary: async (req, res) => {
    const id = req.params.id
    let itynerary
    let error = null
    try {
      itinerary = await itineraries.findOne({ _id: id })
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
    const { itinerary, creator, price, duration, hashtags, likes, activities } = req.body
    let Itinerary
    let error = null
    try {
      Itinerary = await new itineraries({
        itinerary: itinerary,
        creator: creator,
        price: price,
        duration: duration,
        hashtags: hashtags,
        likes: likes,
        activities: activities
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
  }
}

module.exports = itinerariesControllers