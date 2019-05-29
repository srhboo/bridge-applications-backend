const express = require("express");
const { check } = require("express-validator/check");
const config = require("../../../knexfile");
const database = require("knex")(config);

const cohortsController = require("./cohorts.controller");

const router = express.Router();

router.get("", cohortsController.list);
router.post("", cohortsController.create);
router.get("/:id", cohortsController.get);
router.put("/:id", cohortsController.update);
router.delete("/:id", cohortsController.del);

module.exports = {
  cohortsRouter: router
};
