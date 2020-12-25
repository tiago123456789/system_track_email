import AuthEndpoint from "../endpoints/AuthEndpoint";
import FactoryInterface from "./FactoryInterface";
import JwtAuthFactory from "./JwtAuthFactory";

export default class AuthEndpointFactory implements FactoryInterface<AuthEndpoint> {

    make(values: { [key: string]: any; }): AuthEndpoint {
        return new AuthEndpoint(
            new JwtAuthFactory().make({})
        );
    }

}