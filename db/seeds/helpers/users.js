const { getRandomEntry } = require("./random");
const faker = require("faker");
const R = require("ramda");
const {
  USER_EMPLOYMENT_STATUS
} = require("../../../src/routes/users/users.constants");

const createUser = i => {
  const firstName = faker.name.firstName(1);
  const lastName = faker.name.lastName();
  return {
    id: i,
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email(firstName, lastName),
    pronouns: "she/they",
    employment_status: getRandomEntry(R.values(USER_EMPLOYMENT_STATUS)),
    employer: faker.company.companyName()
  };
};

const createNUsers = n => Array.from(Array(n)).map((x, i) => createUser(i + 1));

module.exports = { createNUsers };
