import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('emails', function (table) {
        table.increments();
        table.string("subject", 150).notNullable();
        table.text("body").notNullable();
        table.string("from", 150).notNullable();
        table.string("to", 150).notNullable();
        table.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("emails");
}



