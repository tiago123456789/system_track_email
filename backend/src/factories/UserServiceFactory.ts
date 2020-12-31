import UserService from "../services/UserService";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";
import FactoryInterface from "./FactoryInterface";
import UserRepositoryFactory from "./UserRepositoryFactory";

class UserServiceFactory implements FactoryInterface<UserService> {

    make(values: { [key: string]: any; }): UserService {
        return new UserService(
            new UserRepositoryFactory().make({}),
            new Encrypter(),
            new Uuid()
        )
    }

}

export default UserServiceFactory;

