import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('actions_tracked', function (table) {
        table.dateTime("created_at").defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('actions_tracked', function (table) {
        table.dropColumn("created_at");
    })
}