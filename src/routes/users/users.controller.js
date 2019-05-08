const config = require("../../../knexfile");
const database = require("../../db");
const { check, validationResult } = require("express-validator/check");
const User = require("./users.model");

const list = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    return res.json({ users });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.getUserById({ id }).eager("identifying_info");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await User.insertUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await User.updateUser({
      id: req.params.id,
      userInfo: req.body
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  try {
    const del = await User.deleteUser({ id: req.params.id });
    res.json(del);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  get,
  create,
  update,
  del
};
