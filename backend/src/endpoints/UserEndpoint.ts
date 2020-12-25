import UserService from "../services/UserService";
import { NextFunction, Request, Response }  from "express";
import AbstractValidation from "./validations/AbstractValidation";
import Joi from "joi";
import UserValidation from "./validations/UserValidation";

export default class UserEndpoint {

    constructor(
        private readonly userService: UserService,
    ) {
        this.create = this.create.bind(this);
    }


    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newUser = request.body;
            UserValidation.validate(newUser);
            await this.userService.create(newUser);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }
}