import Joi from "joi";
import AbstractValidation from "./AbstractValidation";

export default class EmailNewsletterValidation extends AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        return Joi.object({
            subject: Joi.string().max(255).required(),
            body: Joi.string().required(),
        });
    }

}