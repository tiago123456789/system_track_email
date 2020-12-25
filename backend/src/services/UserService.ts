import BusinessLogicException from "../exceptions/BusinnessLogicException";
import CodeMessageException from "../exceptions/CodeMessageException";
import User from "../models/User";
import UserRepositoryInterface from "../repositories/contracts/UserRepositoryInterface";
import Encrypter from "../utils/Encrypter";

export default class UserService {

    constructor(
        private readonly repository: UserRepositoryInterface,
        private readonly encrypter: Encrypter
    ) {}

    findPermissionsByUserId(userId: Number): Promise<any> {
        return this.repository.findPermissionsByUserId(userId);
    }

    findByEmail(email: string): Promise<any> {
        return this.repository.findByEmail(email);
    }

    async create(user: User): Promise<any> {
        const userWithEmail = await this.repository.findByEmail(user.email);
        if (userWithEmail) {
            throw new BusinessLogicException(CodeMessageException.EMAIL_CANT_USED);
        }

        // @ts-ignore
        user.password = await this.encrypter.getHash(user.password);
        return this.repository.create(user);
    }

    
}