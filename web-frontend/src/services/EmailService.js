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
}