import AbstractHttpService from "./AbstractHttpService";
import AuthService from "./AuthService";

export default class UserService extends AbstractHttpService {

    constructor() {
        super();
        this._authService = new AuthService();
    }

    create(user) {
        return this.post(`users`, user, this._authService.getAccessToken());
    }

    resetPassword(email) {
        return this.post(`reset-passwords`, {email}, this._authService.getAccessToken());
    }

    checkResetPasswordLink(token) {
        return this.get(`reset-passwords/${token}`, this._authService.getAccessToken());
    }

}