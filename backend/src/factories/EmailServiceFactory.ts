import EmailService from "../services/EmailService";
import TrackerActionService from "../services/TrackerActionService";
import EmailFactory from "./EmailFactory";
import EmailRepositoryFactory from "./EmailRepositoryFactory";
import FactoryInterface from "./FactoryInterface";

export default class EmailServiceFactory implements FactoryInterface<EmailService> {
    
    make(values: { [key: string]: any; }): EmailService {
        return new EmailService(
            new EmailRepositoryFactory().make({}),
            new EmailFactory().make({}),
            new TrackerActionService(),
        );
    }

}