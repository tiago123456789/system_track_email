import AbstractHttpService from "./AbstractHttpService";
import AuthService from "./AuthService";

export default class NewsletterService extends AbstractHttpService {

    constructor() {
        super();
        this._authService = new AuthService();
    }

    getAll() {
        return this.get(`newsletters`, this._authService.getAccessToken());
    }

    create(name) {
        return this.post(`newsletters`, { name }, this._authService.getAccessToken());
    }

    publish(id, newsletter) {
        return this.post(`publishtions/newsletters/${id}`, newsletter, this._authService.getAccessToken());
    }
}