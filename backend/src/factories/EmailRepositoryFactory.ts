import EmailRepositoryInterface from "../repositories/contracts/EmailRepositoryInterface";
import FactoryInterface from "./FactoryInterface";
import EmailRepository from "../repositories/EmailRepository";

export default class EmailRepositoryFactory implements FactoryInterface<EmailRepositoryInterface> {

    make(values: { [key: string]: any; }): EmailRepositoryInterface {
        return new EmailRepository();
    }

}

