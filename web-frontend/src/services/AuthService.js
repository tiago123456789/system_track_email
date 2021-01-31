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