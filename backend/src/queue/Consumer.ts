import MessageInterface from "./contracts/MessageInterface";
import ConsumerInterface from "./contracts/ConsumerInterface";
import Queueu from "./Queue";

export default class Consumer extends Queueu implements ConsumerInterface {

    constructor(private readonly queueUrl: string) {
        super();
    }

    consume(callback: CallableFunction): void {
        this.queue.receiveMessage({ 
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 1,
            VisibilityTimeout: 0,
            WaitTimeSeconds: 0
        },
            async (error: any, data: any) => {
            if (error) {
                console.log(error); 
            } else if (data.Messages) {
                const message: any = JSON.parse(data.Messages[0].Body);
                await callback(message);
                this.queue.deleteMessage({
                    QueueUrl: this.queueUrl,
                    ReceiptHandle: data.Messages[0].ReceiptHandle
                }, function (error: any, data: any) {
                    if (error) {
                        console.log("Delete Error", error);
                    } else {
                        console.log("Message Deleted", data);
                    }
                });
            }
        })
    }

}