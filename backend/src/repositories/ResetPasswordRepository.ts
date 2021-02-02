import connection from "../config/Database"
import ResetPassword from "../models/ResetPassword";
import ResetPasswordInterface from "./contracts/ResetPasswordInterface";

export default class ResetPasswordRepository implements ResetPasswordInterface {

    create(resetPassword: ResetPassword): Promise<any> {
        return connection("reset_passwords").insert({
            token: resetPassword.token,
            time_expiration: resetPassword.timeExpiration,
            user_id: resetPassword.userId
        });
    }

    async findByToken(token: string): Promise<any> {
        const register = await connection("reset_passwords").where("token", token).select();
        return register[0] || null;
    }

    delete(id: Number): Promise<any> {
        return connection("reset_passwords").where("id", id).del();
    }

}
