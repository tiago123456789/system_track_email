import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username', 120).notNullable();
        table.string('email', 150).notNullable();
        table.string("password").notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

