import MessageInterface from "./MessageInterface";

export default interface ProducerInterface {

    publish(message: MessageInterface): Promise<any>;
}