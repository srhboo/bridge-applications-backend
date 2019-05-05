const { IDENTIFYING_INFO } = require("./helpers/identifying-info");
const { createNUsers } = require("./helpers/users");
const {
  createUserIdentifyingInfo
} = require("./helpers/user-identifying-info");

const users = createNUsers(30);
const userIdentifyingInfo = createUserIdentifyingInfo(users);

exports.seed = knex => {
  const seedIdentifyingInfo = () =>
    knex("identifying_info")
      .del()
      .then(() => knex("identifying_info").insert(IDENTIFYING_INFO));

  const seedUsers = () =>
    knex("users")
      .del()
      .then(() => knex("users").insert(users));

  const seedUserIdentifyingInfo = () =>
    knex("user_identifying_info")
      .del()
      .then(() => knex("user_identifying_info").insert(userIdentifyingInfo));

  return seedIdentifyingInfo()
    .then(seedUsers)
    .then(seedUserIdentifyingInfo);
};
