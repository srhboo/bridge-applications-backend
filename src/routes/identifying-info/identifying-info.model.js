const { Model } = require("objection");

class IdentifyingInfo extends Model {
  static get tableName() {
    return "identifying_info";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "is_gender_related", "is_user_generated"],
      properties: {
        name: { type: "string" },
        is_gender_related: { type: "boolean" },
        is_user_generated: { type: "boolean" }
      }
    };
  }
  static get relationMappings() {
    const User = require("../users/users.model");
    return {
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "identifying_info.id",
          through: {
            from: "user_identifying_info.identifying_info_id",
            to: "user_identifying_info.user_id"
          },
          to: "user.id"
        }
      }
    };
  }
}

module.exports = IdentifyingInfo;
