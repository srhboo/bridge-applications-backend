exports.up = knex =>
  knex.schema
    .createTable("users", table => {
      table.increments();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table
        .string("email")
        .notNullable()
        .unique();
      table.string("pronouns").notNullable();
      table
        .enu("employment_status", [
          "full_time",
          "part_time",
          "in_school",
          "looking",
          "not_looking"
        ])
        .notNullable();
      table.string("employer");
      table.enu("role", ["admin", "user"]).notNullable();
    })
    .createTable("identifying_info", table => {
      table.increments();
      table
        .string("name")
        .notNullable()
        .unique();
      table.boolean("is_gender_related").notNullable();
      table.boolean("is_user_generated").notNullable();
    })
    .createTable("user_identifying_info", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("identifying_info_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("identifying_info");
    })
    .createTable("cohorts", table => {
      table.increments();
      table.string("name").notNullable();
      table.enu("cohort_type", ["frontend", "backend", "design"]).notNullable();
      table.datetime("start_date").notNullable();
      table.datetime("end_date").notNullable();
      table.text("welcome_text").notNullable();
      table.text("thank_you_text").notNullable();
    })
    .createTable("applications", table => {
      table.increments();
      table
        .integer("cohort_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cohorts");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .boolean("accepted_test")
        .notNullable()
        .defaultsTo(false);
      table
        .boolean("accepted_cohort")
        .notNullable()
        .defaultsTo(false);
    })
    .createTable("questions", table => {
      table.increments();
      table.text("question_text").notNullable();
      table
        .boolean("required")
        .notNullable()
        .defaultTo(true);
      table
        .boolean("allow_multiple_choices")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("answer_choices", table => {
      table.increments();
      table.text("choice_text").notNullable();
      table
        .integer("question_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions");
    })
    .createTable("responses", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("question_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions");
      table
        .integer("answer_choice_id")
        .unsigned()
        .references("id")
        .inTable("answer_choices");
      table
        .integer("application_id")
        .unsigned()
        .references("id")
        .inTable("applications");
      table.text("response_text");
    });
exports.down = knex =>
  knex.schema
    .dropTable("responses")
    .dropTable("answer_choices")
    .dropTable("questions")
    .dropTable("applications")
    .dropTable("cohorts")
    .dropTable("user_identifying_info")
    .dropTable("identifying_info")
    .dropTable("users");
