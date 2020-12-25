import JwtAuth from "../security/JwtAuth";
import FactoryInterface from "./FactoryInterface";
import UserServiceFactory from "./UserServiceFactory";
import Encrypter from "../utils/Encrypter";
import TokenFactory from "./TokenFactory";
import AuthInterface from "../security/contracts/AuthInterface";

class JwtAuthFactory implements FactoryInterface<AuthInterface> {

    make(values: { [key: string]: any; }): AuthInterface {
        return new JwtAuth(
            new TokenFactory().make({}),
            new Encrypter(),
            new UserServiceFactory().make({})
        );
    }

}

export default JwtAuthFactory;

