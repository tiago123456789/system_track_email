import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries

    // Inserts seed entries
    await knex("permissions").insert([
        { name: "create_email" },
        { name: "view_details_email" },
        { name: "create_users" },
        { name: "delete_users" },
        { name: "edit_users" },
        { name: "create_user" },
        { name: "list_permission" },
        { name: "create_permission" },
        { name: "add_permission_user" },
        { name: "create_newsletter" },
        { name: "publish_newsletter" }
    ]);

};
