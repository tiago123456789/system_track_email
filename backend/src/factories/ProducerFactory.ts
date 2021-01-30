import ProducerInterface from "../queue/contracts/ProducerInterface";
import Producer from "../queue/Producer";
import FactoryInterface from "./FactoryInterface";

export default class ProducerFactory implements FactoryInterface<ProducerInterface> {

    make(values: { [key: string]: any; }): ProducerInterface {
        if (!values.queueUrl) {
            throw new Error("Need informated queueUrl.")
        }
        return new Producer(values.queueUrl);
    }

}