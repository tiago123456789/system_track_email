import TransportInterface from "../email/contracts/TransportInterface";
import SmtpTransport from "../email/SmtpTransport";
import FactoryInterface from "./FactoryInterface";

export default class TransportFactory implements FactoryInterface<TransportInterface> {

    make(values: { [key:string]: any }): TransportInterface {
        return new SmtpTransport();
    }

}
