const itineraries = require('../models/itinerary')

const commentsControllers = {

  addComment: async (req, res) => {
    const { itineraryId, comment } = req.body.comment
    const user = req.user.id

    try {
      const newComment = await itineraries.findOneAndUpdate({ _id: itineraryId }, { $push: { comments: { comment: comment, user: user, date: Date.now() } } }, { new: true })
      res.json({ success: true, response: { newComment }, message: "Thanks for your comment" })

    }
    catch (error) {
      console.log(error)
      res.json({ success: false, message: "Something went wrong try again in a few minutes" })
    }

  },
  modifyComment: async (req, res) => {
    const { commentId, comment } = req.body.comment
    try {
      const newComment = await itineraries.findOneAndUpdate({ "comments._id": commentId }, { $set: { "comments.$.comment": comment, "comments.$.date": Date.now() } }, { new: true })
      console.log(newComment)
      res.json({ success: true, response: { newComment }, message: "Your comment has been modified" })

    }
    catch (error) {
      console.log(error)
      res.json({ success: true, message: "Something went wrong try again in a few minutes" })
    }

  },
  deleteComment: async (req, res) => {
    const id = req.params.id
    const user = req.user._id
    try {
      const deleteComment = await itineraries.findOneAndUpdate({ "comments._id": id }, { $pull: { comments: { _id: id } } }, { new: true })
      console.log(deleteComment)
      res.json({ success: true, response: { deleteComment }, message: "This message has been deleted" })

    }
    catch (error) {
      console.log(error)
      res.json({ success: false, message: "Something went wrong try again in a few minutes" })
    }

  },

}
module.exports = commentsControllers