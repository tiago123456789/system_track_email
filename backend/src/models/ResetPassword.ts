class ResetPassword {

    constructor(
        public token: string,
        public userId: string,
        public timeExpiration: Date,
        public email? : string
    ) {}
}

export default ResetPassword;