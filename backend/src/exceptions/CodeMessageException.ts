export default class CodeMessageException {

    public static EMAIL_CANT_USED: string = "EMAIL_CANT_USED";
    public static NEWSLETTER_NAME_EXIST: string = "NEWSLETTER_NAME_EXIST";
    public static SOMEONE_PERMISSION_NO_EXIST: string = "SOMEONE_PERMISSION_NO_EXIST";



    private static message: { [key: string]: any} = {
        "EMAIL_CANT_USED": "Email can't used!",
        "NEWSLETTER_NAME_EXIST": "Newsletter with name already exist!",
        "SOMEONE_PERMISSION_NO_EXIST": "Someone permission mencionated not exist!"
    }

    static getMessageByCode(code: string): string {
        return CodeMessageException.message[code] || code;
    }
}