import ResetPasswordService from "../services/ResetPasswordService";
import FactoryInterface from "./FactoryInterface";
import logger from "./../config/Logger";
import EmailFactory from "./EmailFactory";
import ResetPasswordRepositoryFactory from "./ResetPasswordRepositoryFactory";
import Uuid from "../utils/Uuid";
import UserServiceFactory from "./UserServiceFactory";

export default class ResetPasswordServiceFactory implements FactoryInterface<ResetPasswordService> {

    make(values: { [key: string]: any; }): ResetPasswordService {
        return new ResetPasswordService(
            new ResetPasswordRepositoryFactory().make({}),
            new UserServiceFactory().make({}),
            logger,
            new Uuid(),
            new EmailFactory().make({})
        )
    }

}