const { event } = require("./../model/eventModel");
const user = require("./../model/userModel");
const { eventPoster } = require("./../model/eventModel");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

exports.home = async (req, res, next) => {
  // read
  const events = await event
    .find(req.query)
    .select("-__v")
    .select("-_id")
    .select("-tag")
    .select("-createdAt")
    .select("-slug");

  res.status(200).json({
    message: "we are at the home page",
    length: events.length,
    events,
  });
};

exports.how_we_work = (req, res, next) => {
  res.status(200).json({
    message: "how we work page",
  });
};

exports.event_listening = (req, res, next) => {
  res.status(200).json({
    message: "event listening page",
  });
};

exports.contact = (req, res, next) => {
  res.status(200).json({
    message: "contact page",
  });
};

exports.slugData = async (req, res) => {
  const data = await event
    .findOne({ slug: req.params.slug })
    .select("-__v")
    .select("-_id")
    .select("-tag")
    .select("-createdAt")
    .select("-slug");

  res.status(200).json({
    message: "data found sucessfully",
    data,
  });
};

exports.register = async (req, res, next) => {
  // create

  const userID = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const data = await event.create(req.body);
  const userData = await eventPoster.createa({
    eventName: req.body.event_name,
    eventObjectID : req.body._id,
    eventCreator: userID.id
  })

  res.status(200).json({
    message: "send data",
    data,
    userData,
  });
};

exports.eventDelete = async (req, res) => {
  
  const data = await event.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "data deleted now you are redirected to home page",
    data,
  });
};

exports.updateData = async (req, res) => {
  const data = await event.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json({
    message: "data updated",
    data,
  });
};
