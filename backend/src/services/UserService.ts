import BusinessLogicException from "../exceptions/BusinnessLogicException";
import CodeMessageException from "../exceptions/CodeMessageException";
import NotFoundException from "../exceptions/NotFoundException";
import User from "../models/User";
import UserRepositoryInterface from "../repositories/contracts/UserRepositoryInterface";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";

export default class UserService {

    constructor(
        private readonly repository: UserRepositoryInterface,
        private readonly encrypter: Encrypter,
        private readonly uuid: Uuid
    ) {}

    update(id: Number, datas: { [key: string]: any}): Promise<any> {
        return this.repository.update(id, datas);
    }

    findPermissionsByUserId(userId: Number): Promise<any> {
        return this.repository.findPermissionsByUserId(userId);
    }

    findByEmail(email: string): Promise<any> {
        return this.repository.findByEmail(email);
    }

    createPermission(permission: string): Promise<any> {
        return this.repository.createPermission(permission);
    }

    async addPermissions(userId: Number, permissions: Array<Number>) {
        await this.findById(userId);
        const permissionsExistents = await this.repository.findPermissionsByIds(permissions);
        const isExistAllPermissionsMencionated = permissionsExistents == permissions.length;
        if (!isExistAllPermissionsMencionated) {
            throw new NotFoundException(CodeMessageException.SOMEONE_PERMISSION_NO_EXIST);
        }
        return this.repository.addPermissions(userId, permissions);
    }

    getPermissions() {
        return this.repository.getPermissions();
    }

    async create(user: User): Promise<any> {
        const userWithEmail = await this.repository.findByEmail(user.email);
        if (userWithEmail) {
            throw new BusinessLogicException(CodeMessageException.EMAIL_CANT_USED);
        }

        // @ts-ignore
        user.password = await this.encrypter.getHash(user.password);
        user.token = this.uuid.get();
        const userCreated = await this.repository.create(user);
        return this.findById(userCreated[0]);
    }

    public async findById(id: Number) {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new NotFoundException("User not found!");
        }

        return user;
    }

    
}