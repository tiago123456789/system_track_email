import AppException from "./AppException";

class ForbiddenException extends AppException {

    constructor(message: string) {
        super(message);
        this.name = "ForbiddenException";
    }
}

export default ForbiddenException;