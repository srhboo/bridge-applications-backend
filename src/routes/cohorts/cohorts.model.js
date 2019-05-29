const { Model, transaction } = require("objection");
const R = require("ramda");
const { NotFoundError } = require("../../utils/errors");

class Cohorts extends Model {
  static async getCohortById({ id }) {
    const cohort = await Cohorts.query().findById(id);
    if (cohort) {
      return cohort;
    } else {
      throw new NotFoundError("Unable to find cohort");
    }
  }
  static getAllCohorts() {
    return Cohorts.query().select();
  }
  static async insertCohort(cohort) {
    return Cohorts.query().insert(cohort);
  }
  static get tableName() {
    return "cohorts";
  }

  static get relationMappings() {
    return {
      applications: {
        relation: Model.HasManyRelation,
        modelClass: require("../applications/applications.model"),
        join: {
          from: "cohorts.id",
          to: "applications.cohort_id"
        }
      }
    };
  }
}

module.exports = Cohorts;
