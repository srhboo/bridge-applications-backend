const config = require("../../../knexfile");
const database = require("../../db");
const { check, validationResult } = require("express-validator/check");
const IdentifyingInfo = require("./identifying-info.model");

const list = async (req, res, next) => {
  try {
    const identifyingInfo = await IdentifyingInfo.getAllIdentifyingInfo();
    return res.json({ identifyingInfo });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  const id = req.params.id;
  try {
    const identifyingInfo = await IdentifyingInfo.getIdentifyingInfoById({
      id
    });
    res.json(identifyingInfo);
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
    const identifyingInfo = await IdentifyingInfo.insertIdentifyingInfo(
      req.body
    );
    res.json(identifyingInfo);
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
    const cohort = await IdentifyingInfo.updateIdentifyingInfo({
      id: req.params.id,
      identifyingInfo: req.body
    });
    res.json(cohort);
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  try {
    const del = await IdentifyingInfo.deleteIdentifying({ id: req.params.id });
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
