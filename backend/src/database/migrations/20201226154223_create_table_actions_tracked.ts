import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('actions_tracked', function (table) {
        table.increments();
        table.string("actions", 8).notNullable();
        table.text("link")
        table.integer("email_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("emails");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("actions_tracked");
}