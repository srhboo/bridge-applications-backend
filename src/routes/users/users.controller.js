const config = require("../../../knexfile");
const database = require("knex")(config);
const { check, validationResult } = require("express-validator/check");

const list = (req, res, next) => {
  database("users")
    .select("users.*", "identifying_info.name")
    .join(
      "user_identifying_info",
      "users.id",
      "=",
      "user_identifying_info.user_id"
    )
    .join(
      "identifying_info",
      "identifying_info.id",
      "=",
      "user_identifying_info.identifying_info_id"
    )
    .then(users => {
      return res.json({
        users
      });
    })
    .catch(err => {
      next(err);
    });
};

const get = async (req, res, next) => {
  const id = req.params.id;
  try {
    const users = await database("users")
      .select("users.*", "identifying_info.name as identifying_info")
      .join(
        "user_identifying_info",
        "users.id",
        "=",
        "user_identifying_info.user_id"
      )
      .join(
        "identifying_info",
        "identifying_info.id",
        "=",
        "user_identifying_info.identifying_info_id"
      )
      .where("users.id", id);
    if (users.length === 0) {
      return res.json({
        user: {
          ...users[0],
          identifying_info: users.map(user => user.identifying_info)
        }
      });
    }
  } catch (err) {
    next(err);
  }
  // .then(users => {
  //   if (users.length === 0) {
  //     return res.status(404).json({ error: "user not found" });
  //   }
  //   return res.json({
  //     user: {
  //       ...users[0],
  //       identifying_info: users.map(user => user.identifying_info)
  //     }
  //   });
  // })
  // .catch(err => {
  //   next(err);
  // });
};

const create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  const {
    first_name,
    last_name,
    email,
    pronouns,
    employment_status,
    identifying_info = []
  } = req.body;

  // - add user
  // - check request body identities:
  //    - if any do not already exist in identity table, add them
  //    - add all user/identities to join user_identifying_info (check if already exists)

  const addUser = () =>
    database("users")
      .insert({
        first_name,
        last_name,
        email,
        pronouns,
        employment_status
      })
      .returning("*");

  const addNewIdentities = identities => {
    return database("identifying_info")
      .select()
      .then(existingIdentities => {
        const identitiesToAdd = identities.filter(
          identity => !existingIdentities.find(({ name }) => name === identity)
        );
        database("identifying_info").insert(
          identitiesToAdd.map(name => ({
            name,
            is_gender_related: true,
            is_user_generated: true
          }))
        );
      });
  };
  const addUserIdentities = user => {
    addNewIdentities(identifying_info).then();
  };
  // return database("users")
  //   .insert({ first_name, last_name, email, pronouns, employment_status })
  //   .returning("*")
  //   .then(user => {
  //     // req.body.identifying_info = [{ name: '', isGender: boolean}]
  //     const { identifying_info } = req.body;
  //     database("identifying_info")
  //       .select()
  //       .whereIn("name", identifying_info.map(info => info.name))
  //       .then(existing => {
  //         if (existing.length) {
  //           database("user_identifying_info")
  //             .insert(existing.map(info => {
  //               return {
  //                 user_id: users[0].id,
  //                 identifying_info_id: info.id
  //               }
  //             }))
  //             .then(() => {
  //               if(existing.length === identifying_info.length) {
  //                 return res.json({
  //                   user: {
  //                     ...users[0],
  //                     identifying_info: existing
  //                   }
  //                 })
  //               }

  //             });
  //             const new_infos = identifying_info.filter(info => !existing.find(i => i.name === info.name));
  //             database("identifying_info").insert(new_infos).returning('id').then(new_nfos => {

  //             })
  //           return res.json({ user });
  //         }
  //       });
  //     return res.json({ user });
  //   })
  //   .catch(error => next(error));
};

module.exports = {
  list,
  get,
  create
};
