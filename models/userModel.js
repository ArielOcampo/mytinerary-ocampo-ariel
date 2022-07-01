const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  password: [{ type: String, required: true }],
  userPhoto: { type: String },
  country: { type: String },
  from: { type: Array },
  uniqueString: { type: String, required: true },
  verification: { type: Boolean, required: true }

})

const User = mongoose.model('users', userSchema)
module.exports = User