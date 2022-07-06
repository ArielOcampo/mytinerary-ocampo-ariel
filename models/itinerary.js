const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  image: { type: String },
  itinerary: { type: String, required: true },
  creator: {
    name: { type: String, required: true },
    image: { type: String, required: true }
  },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  hashtags: [String],
  likes: [String],
  activities: { type: String },
  city: { type: mongoose.Types.ObjectId, ref: 'cities' },
  comments: [{
    comment: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'users' }
  }]

})
const itinerary = mongoose.model('itineraries', itinerarySchema)
module.exports = itinerary