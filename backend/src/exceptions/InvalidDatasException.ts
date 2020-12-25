import AppException from "./AppException";

class InvalidDatasException extends AppException {

    constructor(message: string) {
        super(message);
        this.name = "InvalidDatasException";
    }
}

export default InvalidDatasException;