const config = require('../../../knexfile');
const database = require('../../db');
const { check, validationResult } = require('express-validator/check');
const Applications = require('./applications.model');

const list = async (req, res, next) => {
  try {
    const applications = await User.getAllApplications();
    return res.json({ applications });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const applications = await Applications.getApplicationById({ id });
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
    const application = await Application.insertApplication(req.body);
    res.json(application);
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
    const application = await Application.updateApplication({
      id: req.params.id,
      applicationInfo: req.body,
    });
    res.json(application);
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  try {
    const del = await Application.deleteApplication({ id: req.params.id });
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
  del,
};
