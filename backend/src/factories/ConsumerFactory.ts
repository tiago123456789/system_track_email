import Consumer from "../queue/Consumer";
import ConsumerInterface from "../queue/contracts/ConsumerInterface";
import FactoryInterface from "./FactoryInterface";

export default class ConsumerFactory implements FactoryInterface<ConsumerInterface> {

    make(values: { [key: string]: any; }): ConsumerInterface {
        if (!values.queueUrl) {
            throw new Error("Need informated queueUrl.")
        }
        return new Consumer(values.queueUrl);
    }

}