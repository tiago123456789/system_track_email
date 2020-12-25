import { Request, Response, NextFunction } from "express";
import CredentialAuthentication from "../models/CredentialAuthentication";
import AuthInterface from "../security/contracts/AuthInterface";
import AuthenticationValidation from "./validations/AuthenticationValidation";

export default class AuthEndpoint {

    constructor(
        private readonly auth: AuthInterface
    ) {
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(request: Request, response: Response, next: NextFunction) {
        try {
            let credentials: { key: string } = request.body;
            AuthenticationValidation.validate(credentials);
            const accessToken = await this.auth.authenticate(
                // @ts-ignore
                new CredentialAuthentication(credentials.email, credentials.password)
            );
            response.status(200).json({ accessToken });
        } catch(error) {
            next(error);
        }
    }
}