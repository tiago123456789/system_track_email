import AppException from "./AppException";

class BusinessLogicException extends AppException {

    constructor(message: string) {
        super(message);
        this.name = "BusinessLogicException";
    }
}

export default BusinessLogicException;