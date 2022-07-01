var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
})

noteSchema.index({ "title": "text", "body": "text" })

module.exports = mongoose.model("Note", noteSchema);