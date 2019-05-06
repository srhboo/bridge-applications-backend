const { IDENTIFYING_INFO } = require("./helpers/identifying-info");
const { createNUsers } = require("./helpers/users");
const {
  createUserIdentifyingInfo
} = require("./helpers/user-identifying-info");

const users = createNUsers(30);
const userIdentifyingInfo = createUserIdentifyingInfo(users);

exports.seed = knex => {
  return knex("user_identifying_info")
    .del()
    .then(() => knex("identifying_info").del())
    .then(() => knex("users").del())
    .then(() => knex("users").insert(users))
    .then(() =>
      knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) from "users"))`)
    )
    .then(() => knex("identifying_info").insert(IDENTIFYING_INFO))
    .then(() =>
      knex.raw(
        `SELECT setval('identifying_info_id_seq', (SELECT MAX(id) from "identifying_info"))`
      )
    )
    .then(() => knex("user_identifying_info").insert(userIdentifyingInfo))
    .then(() =>
      knex.raw(
        `SELECT setval('user_identifying_info_id_seq', (SELECT MAX(id) from "user_identifying_info"))`
      )
    );
};
