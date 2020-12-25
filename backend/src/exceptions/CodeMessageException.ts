export default class CodeMessageException {

    public static EMAIL_CANT_USED: string = "EMAIL_CANT_USED";

    private static message: { [key: string]: any} = {
        "EMAIL_CANT_USED": "Email can't used!"
    }

    static getMessageByCode(code: string): string {
        return CodeMessageException.message[code] || code;
    }
}