import Joi from "joi";
import AbstractValidation from "./AbstractValidation";

export default class AuthenticationValidation extends AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        return Joi.object({
            subject: Joi.string().email().max(150).required(),
            from: Joi.string().email().max(150).required(),
            to: Joi.string().email().max(150).required(),
            body: Joi.string().email().required(),
        });
    }

}