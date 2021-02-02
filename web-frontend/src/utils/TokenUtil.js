
class TokenUtil {

    static getValueInPayloud(key, token) {
        if (!token) {
            return null;
        }
        let payload = token.split(".")[1];
        payload = JSON.parse(atob(payload));
        return payload[key] || null;
    }

    static isExpirated(token) {
        let expiration = TokenUtil.getValueInPayloud("exp", token);
        expiration = expiration * 1000;
        return (expiration) < Date.now();
    }

}

export default TokenUtil;