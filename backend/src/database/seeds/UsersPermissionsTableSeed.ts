import * as Knex from "knex";
import Encrypter from "../../utils/Encrypter";
import Uuid from "../../utils/Uuid";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users_permissions").truncate();

    const encrypter = new Encrypter();
    let userId: any = await knex("users").insert({
        username: "teste",
        email: "teste123@gmail.com",
        password: await encrypter.getHash("123456"),
        token: new Uuid().get()
    });

    userId = userId[0];

    // Inserts seed entries
    await knex("users_permissions").insert([
        { user_id: userId, permission_id: 1 },
        { user_id: userId, permission_id: 2 },
        { user_id: userId, permission_id: 3 },
        { user_id: userId, permission_id: 4 },
        { user_id: userId, permission_id: 5 },
        { user_id: userId, permission_id: 6 },
        { user_id: userId, permission_id: 7 },
        { user_id: userId, permission_id: 8 },
        { user_id: userId, permission_id: 9 },
        { user_id: userId, permission_id: 10 },
        { user_id: userId, permission_id: 11 }
    ]);

};
