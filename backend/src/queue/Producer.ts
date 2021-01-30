import MessageInterface from "./contracts/MessageInterface";
import ProducerInterface from "./contracts/ProducerInterface";
import Queueu from "./Queue";

export default class Producer extends Queueu implements ProducerInterface {

    constructor(private readonly queueUrl: string) {
        super();
    }

    publish(message: MessageInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this.queue.sendMessage({ 
                MessageBody: message.get(),
                QueueUrl: this.queueUrl
            }, (err: any, data: any) => {
                if (err) {
                    reject(err); 
                    return;
                }
                resolve(data);
            })
        });
    }


}