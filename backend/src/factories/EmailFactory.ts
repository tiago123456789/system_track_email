import EmailInterface from "../email/contracts/EmailInterface";
import TransportInterface from "../email/contracts/TransportInterface";
import Email from "../email/Email";
import FactoryInterface from "./FactoryInterface";
import TransportFactory from "./TransportFactory";

export default class EmailFactory implements FactoryInterface<EmailInterface> {

    make(values: { [key:string]: any }): EmailInterface {
        return new Email(
            new TransportFactory().make({})
        );
    }

}
