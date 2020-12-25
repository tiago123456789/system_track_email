import UnAuthorizated from "../exceptions/UnAuthorizated";
import CredentialAuthentication from "../models/CredentialAuthentication";
import TokenPayload from "../models/TokenPayload";
import UserService from "../services/UserService";
import Encrypter from "../utils/Encrypter";
import AuthInterface from "./contracts/AuthInterface";
import TokenInterface from "./contracts/TokenInterface";

export default class JwtAuth implements AuthInterface {

    constructor(
        private readonly token: TokenInterface,
        private readonly encrypter: Encrypter,
        private readonly userService: UserService) {}

    async authenticate(credentials: CredentialAuthentication): Promise<any> {
        let user = await this.userService.findByEmail(credentials.email);
        if (!user) {
            throw new UnAuthorizated("Credentials invalids!");
        }

        // @ts-ignore
        const isValidPassword = await this.encrypter.compare(credentials.password, user.password);
        if (!isValidPassword) {
            throw new UnAuthorizated("Credentials invalids!");
        }

        // @ts-ignore
        const permissions = await this.userService.findPermissionsByUserId(user.id);
        // @ts-ignore
        const tokenPayload = new TokenPayload(user.id, user.username, user.email, permissions)
        return this.token.build(tokenPayload);
    }

    hasPermission(permissionsNecessary: string[], permissionsUser: string[]): boolean {
        const permissionsHasUser = permissionsNecessary
            .filter(permissionNecessary => permissionsUser.indexOf(permissionNecessary) > -1);
        const isHasAccessResource = permissionsNecessary.length == permissionsHasUser.length;
        return isHasAccessResource;
    }

}