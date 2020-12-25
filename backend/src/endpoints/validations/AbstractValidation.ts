import Joi from "joi";
import InvalidDatasException from "../../exceptions/InvalidDatasException";

export default abstract class AbstractValidation {

    protected static rules(): Joi.ObjectSchema {
        throw new Error("Method not implemented!");
    }

    public static validate(datas: { [key: string]: any; }): void {
        const errors = this.rules().validate(datas, { abortEarly: false, allowUnknown: true });

        if (errors.error) {
            const validationErrors: { [key: string]: any } = {};
            errors.error.details.forEach((item: { [key: string]: any }) => {
                validationErrors[item.context.label] = item.message.replace(/"/g, "");
            });

            throw new InvalidDatasException(JSON.stringify(validationErrors));
        }
    }
}