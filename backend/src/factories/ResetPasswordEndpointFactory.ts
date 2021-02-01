import ResetPasswordEndpoint from "../endpoints/ResetPasswordEndpoint";
import FactoryInterface from "./FactoryInterface";
import ResetPasswordServiceFactory from "./ResetPasswordServiceFactory";

export default class ResetPasswordEndpointFactory implements FactoryInterface<ResetPasswordEndpoint> {

    make(values: { [key: string]: any; }): ResetPasswordEndpoint {
        return new ResetPasswordEndpoint(
            new ResetPasswordServiceFactory().make({}),
        );
    }

}