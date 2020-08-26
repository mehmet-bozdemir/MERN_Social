const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ProfileSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
  name: {
    type: String
  },
  userImage: {
    type: String
  },
  company: {
    type: String
  },
  about: {
    type: String
  },
  posts: [{ type: ObjectId, ref: "Post" }],
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
