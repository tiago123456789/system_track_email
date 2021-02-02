import { Request, Response, NextFunction } from "express";
import ResetPassword from "../models/ResetPassword";
import ResetPasswordService from "../services/ResetPasswordService";
import ResetPasswordValidation from "./validations/ResetPasswordValidation";

export default class ResetPasswordEndpoint {

    constructor(
        private readonly resetPasswordService: ResetPasswordService
    ) {
        this.create = this.create.bind(this);
        this.isTokenNotExpired = this.isTokenNotExpired.bind(this);
        this.updatePasswordByToken = this.updatePasswordByToken.bind(this);
    }

    async updatePasswordByToken(request: Request, response: Response, next: NextFunction) {
        try {
            const token = request.params.token;
            const dataModified = request.body;
            await this.resetPasswordService.updatePasswordByToken(token, dataModified);
            response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            let resetPassword: ResetPassword = request.body;
            ResetPasswordValidation.validate(resetPassword);
            await this.resetPasswordService.create(resetPassword);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async isTokenNotExpired(request: Request, response: Response, next: NextFunction) {
        try {
            const token = request.params.token;
            await this.resetPasswordService.isTokenNotExpired(token);
            response.sendStatus(200);
        } catch(error) {
            next(error);
        }
    }
}