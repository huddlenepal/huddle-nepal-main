const factoryFunction = require("./handlerFactory");
const User = require("../model/userModel");
const cookie = require("body-parser");
const { eventPoster } = require("./../model/eventModel");
const jwt = require("jsonwebtoken");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = factoryFunction.getOne(User);
exports.updateMe = async (req, res, next) => {
  // if body contains password credentials ignore them
  if (req.body.password || req.body.passwordConfirm) {
    return res
      .status(400)
      .send("For password update visit,updatePassword route");
  }
  try {
    const { name, email } = req.body;
    let updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");
    res.status(201).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e,
    });
  }
};
exports.deleteMe = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.getAllUser = factoryFunction.getAll(User);
exports.deleteUser = factoryFunction.deleteOne(User);

exports.findEventCreated = async (req, res) => {
  const userID = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const createdEvent = await eventPoster.findById(userID);

  res.status(200).json({
    message: "found the data",
    createdEvent,
  });
};

exports.updateUser = factoryFunction.updateOne(User);
