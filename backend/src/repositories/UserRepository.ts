import User from "../models/User";
import UserRepositoryInterface from "./contracts/UserRepositoryInterface";
import connection from "../config/Database"

class UserRepository implements UserRepositoryInterface {

    private model: any;

    constructor() {
        this.model = connection("users");
    }
    
    async findPermissionsByUserId(userId: Number): Promise<any> {
        let permissionsIds = await connection("users_permissions").where("user_id", userId).select("permission_id");
        permissionsIds = permissionsIds.map(item => item.permission_id);
        const permissions = await connection("permissions").whereIn("id", permissionsIds).select("name");
        return permissions.map(item => item.name);
    }
    
    async findByEmail(email: string): Promise<any> {
        const register =  await this.model.where("email", email).limit(1);
        return register[0] || null;
    }

    create(user: User): Promise<any> {
        return this.model.insert({
            username: user.username,
            email: user.email,
            password: user.password
        });
    }

}

export default UserRepository;