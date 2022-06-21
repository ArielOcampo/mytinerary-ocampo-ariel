const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  itinerary: { type: String, required: true },
  creator: {
    name: { type: String, required: true },
    image: { type: String, required: true }
  },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  hashtags: [String],
  likes: [String],
  activities: { type: String }

})
const itinerary = mongoose.model('itineraries', itinerarySchema)
module.exports = itinerary