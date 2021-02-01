export default class CodeMessageException {

    public static EMAIL_CANT_USED: string = "EMAIL_CANT_USED";
    public static NEWSLETTER_NAME_EXIST: string = "NEWSLETTER_NAME_EXIST";
    public static SOMEONE_PERMISSION_NO_EXIST: string = "SOMEONE_PERMISSION_NO_EXIST";
    public static NO_RESET_PASSWORD: string = "NO_RESET_PASSWORD";
    public static RESET_LINK_INVALID: string = "RESET_LINK_INVALID";


    private static message: { [key: string]: any} = {
        "EMAIL_CANT_USED": "Email can't used!",
        "NEWSLETTER_NAME_EXIST": "Newsletter with name already exist!",
        "SOMEONE_PERMISSION_NO_EXIST": "Someone permission mencionated not exist!",
        "NO_RESET_PASSWORD": "Oops! You can't reset password.",
        "RESET_LINK_INVALID": "Reset link is invalid."
    }

    static getMessageByCode(code: string): string {
        return CodeMessageException.message[code] || code;
    }
}