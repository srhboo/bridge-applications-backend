const { IDENTIFYING_INFO } = require("./identifying-info");
const { getRandomEntry } = require("./random");

const createUserIdentifyingInfo = users =>
  users.map((user, i) => ({
    id: i,
    user_id: user.id,
    identifying_info_id: getRandomEntry(IDENTIFYING_INFO)["id"]
  }));

module.exports = { createUserIdentifyingInfo };
