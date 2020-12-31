import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('newsletters_emails', function (table) {
        table.increments();
        table.dateTime("notified_at").defaultTo(knex.fn.now());
        table.integer("email_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("emails");

        table.integer("newsletter_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("newsletters");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('newsletters_emails');
}