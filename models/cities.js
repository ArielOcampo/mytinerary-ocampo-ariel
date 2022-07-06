const mongoose = require('mongoose')

const citiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  itinerary: [{ type: mongoose.Types.ObjectId, ref: 'itineraries' }],




})
const Cities = mongoose.model('cities', citiesSchema)
module.exports = Cities