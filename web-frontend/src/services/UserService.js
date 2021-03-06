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

    findAll() {
        return this.get(`users`, this._authService.getAccessToken());
    }

    update(id, datasModified) {
        return this.put(`users/${id}`, datasModified, this._authService.getAccessToken());
    }

    findById(id) {
        return this.get(`users/${id}`, this._authService.getAccessToken());
    }

    resetPassword(email) {
        return this.post(`reset-passwords`, {email}, this._authService.getAccessToken());
    }

    checkResetPasswordLink(token) {
        return this.get(`reset-passwords/${token}`, this._authService.getAccessToken());
    }

    updatePasswordByResetLink(token, datas) {
        return this.put(`reset-passwords/${token}`, datas, this._authService.getAccessToken());
    }

}