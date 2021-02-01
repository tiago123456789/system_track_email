import FactoryInterface from "./FactoryInterface";
import ResetPasswordInterface from "../repositories/contracts/ResetPasswordInterface";
import ResetPasswordRepository from "../repositories/ResetPasswordRepository";

export default class ResetPasswordRepositoryFactory implements FactoryInterface<ResetPasswordInterface> {

    make(values: { [key: string]: any; }): ResetPasswordInterface {
        return new ResetPasswordRepository();
    }

}

