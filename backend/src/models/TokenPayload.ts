export default class TokenPayload {

    constructor(
        public id: Number,
        public name: string,
        public email: string,
        public permissions: Array<string>
    ) {}
}