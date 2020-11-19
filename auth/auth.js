const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const { receiveMessages } = require("../notification/notification");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    //receiveMessages(req.user.Name);
    next();
  } catch (e) {
    res.status(400).send("Unauthorized access");
  }
};

module.exports = auth;
