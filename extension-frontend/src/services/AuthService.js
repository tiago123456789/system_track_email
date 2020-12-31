import CONSTANTS from "../constants/App";

export default class AuthService {

    authenticate(token) {
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE.TOKEN, token);
    }

    logout() {
        localStorage.removeItem(CONSTANTS.LOCAL_STORAGE.TOKEN);
    }

    isAuthenticated() {
        return localStorage.getItem(CONSTANTS.LOCAL_STORAGE.TOKEN) != null;
    }

    getToken() {
        return localStorage.getItem(CONSTANTS.LOCAL_STORAGE.TOKEN);
    }
}