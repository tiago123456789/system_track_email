import User from "../../models/User";

interface UserRepositoryInterface {

    create(user: User): Promise<any>

    findByEmail(email: string): Promise<any>;

    findById(id: Number): Promise<any>;

    findPermissionsByUserId(userId: Number): Promise<any>;
    
    getPermissions(): Promise<any>;

    addPermissions(userId: Number, permissions: Array<Number>): Promise<any>;

    findPermissionsByIds(permissionsIds: Number[]): Promise<any>;

    createPermission(permission: string): Promise<any>;
}

export default UserRepositoryInterface;