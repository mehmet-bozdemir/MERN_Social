const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  user: {
    type: ObjectId
  },
  text: {
    type: String,
    required: "Text is required"
  },
  name: {
    type: String
  },
  postImage: {
    type: String
  },
  likes: [{ user: { type: ObjectId } }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" },
      name: String,
      userImage: String
    }
  ],
  postedBy: { type: ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
