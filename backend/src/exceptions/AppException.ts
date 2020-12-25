import CodeMessageException from "./CodeMessageException";

class AppException extends Error {

    constructor(message: string) {
        super(CodeMessageException.getMessageByCode(message));
    }
}

export default AppException;