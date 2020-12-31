import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', function (table) {
        table.string('token').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', function (table) {
        table.dropColumn('token');
    })
}


