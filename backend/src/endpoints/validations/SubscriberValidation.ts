import Joi from "joi";
import AbstractValidation from "./AbstractValidation";

export default class SubscriberValidation extends AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        return Joi.object({
            email: Joi.string().email().max(150).required(),
        });
    }

}