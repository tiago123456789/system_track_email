import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('schedule_emails', function (table) {
        table.increments();
        table.enum("status", ["PENDENT", "PROCESSING", "PROCESSED"]).notNullable();
        table.dateTime("scheduled_at").notNullable();
        table.integer("email_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("emails");
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("schedule_emails");
}



