export default class CodeMessageException {

    public static EMAIL_CANT_USED: string = "EMAIL_CANT_USED";
    public static NEWSLETTER_NAME_EXIST: string = "NEWSLETTER_NAME_EXIST";


    private static message: { [key: string]: any} = {
        "EMAIL_CANT_USED": "Email can't used!",
        "NEWSLETTER_NAME_EXIST": "Newsletter with name already exist!"
    }

    static getMessageByCode(code: string): string {
        return CodeMessageException.message[code] || code;
    }
}