import AbstractHttpService from "./AbstractHttpService";
import AuthService from "./AuthService";

export default class PermissionService extends AbstractHttpService {

    constructor() {
        super();
        this._authService = new AuthService();
    }

    create(permission) {
        return this.post(`users/permissions`, { 
            name: permission
        }, this._authService.getAccessToken());
    }

    getAll() {
        return this.get(`users/permissions`, this._authService.getAccessToken());
    }

    addPermissionForUser(userId, permissions) {
        return this.post(
            `users/${userId}/permissions`, 
            { permissions: permissions },
             this._authService.getAccessToken()
        );
    }
    
}