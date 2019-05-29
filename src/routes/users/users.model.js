const { Model, transaction } = require('objection');
const R = require('ramda');
const { USER_EMPLOYMENT_STATUS } = require('./users.constants');

class User extends Model {
  static getUserById({ id }) {
    return User.query().findById(id);
  }

  static getAllUsers() {
    return User.query().select();
  }

  static async insertUser({
    first_name,
    last_name,
    email,
    employment_status,
    employer,
    pronouns,
    identifying_info,
  }) {
    const IdentifyingInfo = require('../identifying-info/identifying-info.model');
    const knex = User.knex();
    const identifying_info_with_ids = await Promise.all(
      identifying_info.map(async (info) => {
        const { name, is_gender_related, id } = info;
        if (id) {
          return info;
        }
        const existingInfo = await IdentifyingInfo.query().where('name', name);
        return existingInfo.length
          ? existingInfo[0]
          : { name, is_gender_related, is_user_generated: true };
      }),
    );
    try {
      const user = await transaction(knex, async trx => User.query(trx).upsertGraphAndFetch(
        {
          first_name,
          last_name,
          email,
          employment_status,
          employer,
          pronouns,
          identifying_info: identifying_info_with_ids,
        },
        { relate: true },
      ));
      return user;
    } catch (error) {
      throw new Error('error');
    }
  }

  static async updateUser({ id, userInfo }) {
    return User.query().patchAndFetchById(id, userInfo);
  }

  static async deleteUser({ id }) {
    return User.query().deleteById(id);
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'first_name',
        'last_name',
        'email',
        'employment_status',
        'pronouns',
      ],
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        employment_status: {
          type: 'string',
          enum: R.values(USER_EMPLOYMENT_STATUS),
        },
        pronouns: { type: 'string' },
        employer: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const IdentifyingInfo = require('../identifying-info/identifying-info.model');
    return {
      identifying_info: {
        relation: Model.ManyToManyRelation,
        modelClass: IdentifyingInfo,
        join: {
          from: 'users.id',
          through: {
            from: 'user_identifying_info.user_id',
            to: 'user_identifying_info.identifying_info_id',
          },
          to: 'identifying_info.id',
        },
      },
    };
  }
}

module.exports = User;
