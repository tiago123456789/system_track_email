import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('permissions', function (table) {
        table.increments();
        table.string('name').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("permissions");
}


