import AbstractHttpService from "./AbstractHttpService";
import AuthService from "./AuthService";

export default class Email extends AbstractHttpService {

    constructor() {
        super();
        this._authService = new AuthService();
    }

    send(email) {
        return this.post(`emails`, email, this._authService.getAccessToken());
    }

    getAll() {
        return this.get(`emails`, this._authService.getAccessToken()); 
    }

    getActionsTracked(emailId) {
        return this.get(`emails/${emailId}/tracks`, this._authService.getAccessToken()); 
    }
}