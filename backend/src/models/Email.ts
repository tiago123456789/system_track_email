export default class Email {

    constructor(
        public subject: string,
        public from: string ,
        public to: string | null,
        public body: string,
        public userId: Number,
        public id? : Number
    ) {}
}