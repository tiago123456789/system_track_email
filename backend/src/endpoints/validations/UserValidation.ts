import Joi from "joi";
import AbstractValidation from "./AbstractValidation";

export default class UserValidation extends AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        return Joi.object({
            username: Joi.string().max(120).required(),
            email: Joi.string().email().max(150).required(),
            password: Joi.string().min(6).required(),
        });
    }

}