const config = require('../../../knexfile');
const database = require('../../db');
const { check, validationResult } = require('express-validator/check');
const Cohorts = require('./cohorts.model');

const list = async (req, res, next) => {
  try {
    const cohorts = await Cohorts.getAllCohorts();
    return res.json({ cohorts });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cohort = await Cohorts.getCohortById({ id });
    res.json(cohort);
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
    const cohort = await Cohorts.insertCohort(req.body);
    res.json(cohort);
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
    const cohort = await Cohorts.updateCohort({
      id: req.params.id,
      cohortInfo: req.body,
    });
    res.json(cohort);
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  try {
    const del = await Cohorts.deleteCohort({ id: req.params.id });
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
