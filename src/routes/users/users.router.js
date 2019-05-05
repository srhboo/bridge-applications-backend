const express = require("express");
const { check } = require("express-validator/check");
const config = require("../../../knexfile");
const database = require("knex")(config);

const usersController = require("./users.controller");

const router = express.Router();

router.get("", usersController.list);
router.post(
  "",
  [
    check("first_name", "first name must be string").isString(),
    check("first_name", "first name must be at least 2 letters").isLength(2),
    check("last_name", "last name must be string").isString(),
    check("last_name", "last name must be at least 2 letters").isLength(2),
    check("email", "email must be valid").isEmail(),
    check("email", "email must be valid").custom(value => {
      return database("users")
        .where({ email: value })
        .then(users => {
          if (users.length) {
            return Promise.reject("email must be unique");
          }
        });
    }),
    check("pronouns", "pronouns must be string").isString(),
    check("employment_status", "must be string").isString(),
    check("identifying_info", "must be array").isArray()
  ],
  usersController.create
);
router.get("/:id", usersController.get);

module.exports = {
  usersRouter: router
};