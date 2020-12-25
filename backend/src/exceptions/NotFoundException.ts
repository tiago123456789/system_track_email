import AppException from "./AppException";

class NotFoundException extends AppException {

    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
    }
}

export default NotFoundException;