import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    //await knex("permissions").del();

    // Inserts seed entries
    await knex("permissions").insert([
        { name: "create_email" },
        { name: "view_details_email" },
        { name: "create_users" },
        { name: "delete_users" },
        { name: "edit_users" },
    ]);

};
