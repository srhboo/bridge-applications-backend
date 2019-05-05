const { getRandomEntry } = require("./random");
const faker = require("faker");

const EMPLOYMENT_STATUSES = [
  "full_time",
  "part_time",
  "in_school",
  "looking",
  "not_looking"
];

const createUser = i => {
  const firstName = faker.name.firstName(1);
  const lastName = faker.name.lastName();
  return {
    id: i,
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email(firstName, lastName),
    pronouns: "she/they",
    employment_status: getRandomEntry(EMPLOYMENT_STATUSES),
    employer: faker.company.companyName()
  };
};

const createNUsers = n => Array.from(Array(n)).map((x, i) => createUser(i));

module.exports = { createNUsers };
