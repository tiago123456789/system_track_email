import CredentialAuthentication from "../../models/CredentialAuthentication";
import User from "../../models/User";

interface UserRepositoryInterface {

    create(user: User): Promise<any>

    findByEmail(email: string): Promise<any>;

    findPermissionsByUserId(userId: Number): Promise<any>
}

export default UserRepositoryInterface;