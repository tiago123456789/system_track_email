import AbstractHttpService from "./AbstractHttpService";
import Constants from "../constants/App";
import TokenUtil from "../utils/TokenUtil";9

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

        const permissions = TokenUtil.getValueInPayloud("permissions", token) || [];
        const userPermissions = permissionsNeeded
                                    .filter(item => permissions.indexOf(item) > -1);
        return userPermissions.length == permissionsNeeded.length;
    }
    
    logout() {
        localStorage.removeItem(Constants.LOCALSTORAGE.ACCESS_TOKEN);
    }

    isAuthenticated() {
        const token = localStorage.getItem(Constants.LOCALSTORAGE.ACCESS_TOKEN);
        if (!token || TokenUtil.isExpirated(token)) {
            return false
        }

        return true;
    }

    getAccessToken() {
        return localStorage.getItem(Constants.LOCALSTORAGE.ACCESS_TOKEN);
    }

}