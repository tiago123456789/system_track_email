class User {

    constructor(
        public username: string,
        public email: string,
        public password: string,
        public token?: string
    ) {}
}

export default User;