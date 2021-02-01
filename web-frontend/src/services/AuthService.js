import AbstractHttpService from "./AbstractHttpService";
import Constants from "../constants/App";

export default class AuthService extends AbstractHttpService {

    constructor() {
        super();
    }

    authenticate(credentials) {
        return this.post(`auth`, { 
            email: credentials.username,
            password: credentials.password 
        });
    }

    hasPermissions(permissionsNeeded) {
        const token = localStorage.getItem(Constants.LOCALSTORAGE.ACCESS_TOKEN);
        if (!token) {
            return false;
        }
        let payload = token.split(".")[1];
        payload = JSON.parse(atob(payload));
        const permissions = payload["permissions"] || [];
        const userPermissions = permissionsNeeded
                                    .filter(item => permissions.indexOf(item) > -1);
        return userPermissions.length == permissionsNeeded.length;
    }
    
    logout() {
        localStorage.removeItem(Constants.LOCALSTORAGE.ACCESS_TOKEN);
    }

    isAuthenticated() {
        return localStorage.getItem(Constants.LOCALSTORAGE.ACCESS_TOKEN) != null;
    }

    getAccessToken() {
        return localStorage.getItem(Constants.LOCALSTORAGE.ACCESS_TOKEN);
    }

}