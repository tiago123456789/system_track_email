import UserEndpoint from "../endpoints/UserEndpoint";
import FactoryInterface from "./FactoryInterface";
import UserServiceFactory from "./UserServiceFactory";

class UserEndpointFactory implements FactoryInterface<UserEndpoint> {

    make(values: { [key: string]: any; }): UserEndpoint {
        return new UserEndpoint(
            new UserServiceFactory().make({})
        )
    }

}

export default UserEndpointFactory;

