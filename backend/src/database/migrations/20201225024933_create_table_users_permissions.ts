import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users_permissions', function (table) {
        table.increments();
        table.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users");
        table.integer("permission_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("permissions");

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users_permissions");
}

