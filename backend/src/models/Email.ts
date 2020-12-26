export default class Email {

    constructor(
        public subject: string,
        public from: string,
        public to: string,
        public body: string,
        public userId: Number
    ) {}
}