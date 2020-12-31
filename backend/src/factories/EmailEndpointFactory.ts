import EmailEndpoint from "../endpoints/EmailEndpoint";
import WebsocketNotification from "../notifications/WebsocketNotification";
import EmailServiceFactory from "./EmailServiceFactory";
import FactoryInterface from "./FactoryInterface";
import UserServiceFactory from "./UserServiceFactory";

export default class EmailEndpointFactory implements FactoryInterface<EmailEndpoint> {

    make(values: { [key: string]: any; }): EmailEndpoint {
        return new EmailEndpoint(
            new EmailServiceFactory().make({}),
            new UserServiceFactory().make({}),
            new WebsocketNotification()
        );
    }

}