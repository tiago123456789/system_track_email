import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('emails', function (table) {
        table.string("to", 150).nullable().alter();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('emails', function (table) {
        table.string("to", 150).notNullable().alter();
    })
}



