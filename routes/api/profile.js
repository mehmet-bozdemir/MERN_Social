const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const multer = require("multer");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter
});

// @route    GET api/users
// @desc     Get current user
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      });

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    upload.single("userImage"),
    [check("company", "Company is required").not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { company, about } = req.body;

    const user = await User.findById(req.user.id);

    const profileFields = {
      user: req.user.id,
      userImage: req.file.path,
      company,
      name: user.name,
      about
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put("/", [auth, upload.single("userImage")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;

  // const user = req.user.id
  const company = body.company;
  const about = body.about;
  const userImage = req.file.path;
  const updates = {
    user: req.user.id,
    company,
    userImage,
    about
  };

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updates },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile/:id
// @desc     Delete a profile
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Check user
    if (profile.user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await profile.remove();

    res.json({ msg: "Profile removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/follow
// @desc     Follow a user
// @access   Private
router.put("/follow/:followId", auth, async (req, res) => {
  const item = await Profile.findOne({ user: req.params.followId });
  if (item.followers.some((follower) => follower.toString() === req.user.id))
    return res.status(400).json({ msg: " this user is already followed" });

  Profile.findOneAndUpdate(
    { user: req.params.followId },

    {
      $push: { followers: req.user.id }
    },
    {
      new: true
    },
    () => {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { following: req.params.followId }
        },
        { new: true }
      )
        .then((result) => {
          // console.log(result);
          res.json(result);
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(422).send({ error: err });
        });
    }
  );
});

// @route    PUT api/users/unfollow
// @desc     Unfollow a user
// @access   Private
router.put("/unfollow/:unfollowId", auth, async (req, res) => {
  const item = await Profile.findOne({ user: req.params.unfollowId });
  if (!item.followers.some((follower) => follower.toString() === req.user.id))
    return res.status(400).json({ msg: " this user is not being followed" });

  Profile.findOneAndUpdate(
    { user: req.params.unfollowId },
    {
      $pull: { followers: req.user.id }
    },
    {
      new: true
    },
    () => {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $pull: { following: req.params.unfollowId }
        },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(422).send({ error: err });
        });
    }
  );
});

module.exports = router;
