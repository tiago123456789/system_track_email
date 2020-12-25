import AppException from "./AppException";

class UnAuthorizated extends AppException {

    constructor(message: string) {
        super(message);
        this.name = "UnAuthorizated";
    }
}

export default UnAuthorizated;