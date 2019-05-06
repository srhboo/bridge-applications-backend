const { Model } = require("objection");
const R = require("ramda");
const { USER_EMPLOYMENT_STATUS } = require("./users.constants");

class User extends Model {
  static insertUser({
    first_name,
    last_name,
    email,
    employment_status,
    employer,
    pronouns
  }) {
    return User.query()
      .insert({
        first_name,
        last_name,
        email,
        employment_status,
        employer,
        pronouns
      })
      .returning("*");
  }
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "first_name",
        "last_name",
        "email",
        "employment_status",
        "pronouns"
      ],
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        employment_status: {
          type: "string",
          enum: R.values(USER_EMPLOYMENT_STATUS)
        },
        pronouns: { type: "string" },
        employer: { type: "string" }
      }
    };
  }

  static get relationMappings() {
    const IdentifyingInfo = require("../identifying-info/identifying-info.model");
    return {
      identifying_info: {
        relation: Model.ManyToManyRelation,
        modelClass: IdentifyingInfo,
        join: {
          from: "users.id",
          through: {
            from: "user_identifying_info.user_id",
            to: "user_identifying_info.identifying_info_id"
          },
          to: "identifying_info.id"
        }
      }
    };
  }
}

module.exports = User;
