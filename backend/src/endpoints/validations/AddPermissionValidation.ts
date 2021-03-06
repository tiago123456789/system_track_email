import Joi from "joi";
import AbstractValidation from "./AbstractValidation";

export default class AddPermissionValidation extends AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        return Joi.object({
            permissions: Joi.array().min(1).required(),
        });
    }

}