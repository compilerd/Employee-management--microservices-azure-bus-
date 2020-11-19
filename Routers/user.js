const express = require("express");

const router = new express.Router();

const User = require("../Models/user");
const { receiveMessages } = require("../notification/notification");

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateUserToken();

    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.Email, req.body.Password);

    const token = await user.generateUserToken();

    res.status(200).send({ user, token });
    receiveMessages(user.Name);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
