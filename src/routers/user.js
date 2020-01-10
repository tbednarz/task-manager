const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

//create new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save(); //save user
    const token = await user.generateAuthToken();
    //if user saves send 201 status and the user info
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//log user in
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(200);
  } catch (e) {
    res.sendStatus(500).send();
  }
});
//get all users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//update a user by id
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body); //returns a string of the requested updates
  const allowedUpdates = ["name", "email", "password", "age"]; //list of allowed updates
  const isValidOp = updates.every(update => allowedUpdates.includes(update)); //checks to make sure update request is included in allowedUpdates

  if (!isValidOp) {
    return res.status(400).send({
      //if update is invalid throws error
      error: "Invalid Updates"
    });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete a user by id
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
