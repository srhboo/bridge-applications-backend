const { Model, transaction } = require("objection");
const R = require("ramda");

const { NotFoundError } = require("../../utils/errors");

class Application extends Model {
  static async getApplicationById({ id }) {
    const application = await Application.query().findById(id);
    if (application) {
      return application;
    } else {
      throw new NotFoundError("Unable to find application");
    }
  }
  static getAllApplications() {
    return Application.query().select();
  }
  static async insertApplication(application) {
    Application.query().insertAndFetch(application);
  }
  static get tableName() {
    return "applications";
  }

  static get relationMappings() {
    return {
      cohort: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("../cohorts/cohorts.model"),
        join: {
          from: "applications.cohort_id",
          to: "cohorts.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("../users/users.model"),
        join: {
          from: "applications.user_id",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = User;
