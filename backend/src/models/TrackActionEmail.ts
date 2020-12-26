export default class TrackActionEmail {

    constructor(
        public readonly emailId: Number,
        public readonly to: String,
        public readonly actions: string,
        public readonly link: string | null
    ) {}
}