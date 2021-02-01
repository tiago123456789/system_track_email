import Email from "../../models/Email";
import ResetPassword from "../../models/ResetPassword";

export default interface ResetPasswordInterface {

    create(resetPassword: ResetPassword): Promise<any>;
    
    findByToken(token: string): Promise<any>;
}
