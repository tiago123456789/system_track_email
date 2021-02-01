import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('reset_passwords', function (table) {
        table.increments();
        table.string('token').notNullable();
        table.dateTime("time_expiration").notNullable();
        table.integer("user_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("users");
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("reset_passwords");
}

