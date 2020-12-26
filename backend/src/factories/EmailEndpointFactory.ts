import EmailEndpoint from "../endpoints/EmailEndpoint";
import EmailServiceFactory from "./EmailServiceFactory";
import FactoryInterface from "./FactoryInterface";

export default class EmailEndpointFactory implements FactoryInterface<EmailEndpoint> {

    make(values: { [key: string]: any; }): EmailEndpoint {
        return new EmailEndpoint(
            new EmailServiceFactory().make({})
        );
    }

}