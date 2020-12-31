import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('newsletters', function (table) {
        table.increments();
        table.string("name", 150).notNullable();
        table.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("newsletters");
}



