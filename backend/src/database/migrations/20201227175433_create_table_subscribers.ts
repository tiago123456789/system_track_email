import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('subscribers', function (table) {
        table.increments();
        table.string("name", 100);
        table.string("email", 150).notNullable();
        table.integer("newsletter_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("newsletters");
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("subscribers");
}





