import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('actions_tracked', function (table) {
        table.string("to", 150);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('actions_tracked', function (table) {
        table.dropColumn("to");
    })
}

