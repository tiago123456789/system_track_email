import MessageInterface from "../contracts/MessageInterface";

export default class EmailMessage implements MessageInterface {

    constructor(
        public readonly from: string,
        public readonly to: string,
        public readonly subject: string,
        public readonly body: string,
        public readonly uuid: string
    ) {}

    get(): string {
        return JSON.stringify({
           from: this.from,
           to: this.to,
           subject: this.subject,
           body: this.body,
           uuid: this.uuid
        });
    }

}