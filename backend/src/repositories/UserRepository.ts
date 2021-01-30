import User from "../models/User";
import UserRepositoryInterface from "./contracts/UserRepositoryInterface";
import connection from "../config/Database"

class UserRepository implements UserRepositoryInterface {


    async findPermissionsByIds(permissionsIds: Number[]): Promise<any> {
        const register = await connection("permissions").whereIn("id", permissionsIds).count("id as count");
        // @ts-ignore
        return register[0]["count"] || 0;
    }

    async findById(id: Number): Promise<any> {
        const register = await connection("users").where("id", id).select("*");
        return register[0] || null;
    }


    async addPermissions(userId: Number, permissions: Number[]): Promise<any> {
        await connection("users_permissions").where("user_id", userId).del();

        const pemissionsForInsert = permissions.map(permission => {
            return { user_id: userId, permission_id: permission };
        });
        return connection("users_permissions").insert(pemissionsForInsert);
    }

    createPermission(permission: string): Promise<any> {
        return connection("permissions").insert({ name: permission });
    }

    getPermissions(): Promise<any> {
        return connection("permissions").select();
    }

    async findPermissionsByUserId(userId: Number): Promise<any> {
        let permissionsIds = await connection("users_permissions").where("user_id", userId).select("permission_id");
        permissionsIds = permissionsIds.map(item => item.permission_id);
        const permissions = await connection("permissions").whereIn("id", permissionsIds).select("name");
        return permissions.map(item => item.name);
    }
    
    async findByEmail(email: string): Promise<any> {
        const register =  await connection("users").where("email", email).limit(1);
        return register[0] || null;
    }

    create(user: User): Promise<any> {
        return connection("users").insert({
            username: user.username,
            email: user.email,
            password: user.password,
            token: user.token
        });
    }

}

export default UserRepository;