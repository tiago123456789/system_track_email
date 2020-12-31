import Joi from "joi";
import AbstractValidation from "./AbstractValidation";

export default class PermissionValidation extends AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        return Joi.object({
            name: Joi.string().max(255).required(),
        });
    }

}