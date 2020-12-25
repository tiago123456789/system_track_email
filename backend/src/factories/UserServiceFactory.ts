import UserService from "../services/UserService";
import Encrypter from "../utils/Encrypter";
import FactoryInterface from "./FactoryInterface";
import UserRepositoryFactory from "./UserRepositoryFactory";

class UserServiceFactory implements FactoryInterface<UserService> {

    make(values: { [key: string]: any; }): UserService {
        return new UserService(
            new UserRepositoryFactory().make({}),
            new Encrypter()
        )
    }

}

export default UserServiceFactory;

