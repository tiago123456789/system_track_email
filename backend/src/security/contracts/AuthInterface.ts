import CredentialAuthentication from "../../models/CredentialAuthentication";

export default interface AuthInterface {

    authenticate(credentials: CredentialAuthentication): Promise<any>;

    hasPermission(permissionsNecessary: Array<string>, permissionsUser: Array<string>): boolean;
}