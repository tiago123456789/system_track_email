import * as Knex from "knex";
import Encrypter from "../../utils/Encrypter";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users_permissions").del();

    const encrypter = new Encrypter();
    let userId: any = await knex("users").insert({
        username: "teste",
        email: "teste123@gmail.com",
        password: await encrypter.getHash("123456")
    });

    userId = userId[0];

    // Inserts seed entries
    await knex("users_permissions").insert([
        { user_id: userId, permission_id: 1 },
        { user_id: userId, permission_id: 2 },
        { user_id: userId, permission_id: 3 },
        { user_id: userId, permission_id: 4 },
        { user_id: userId, permission_id: 5 }
    ]);
};
