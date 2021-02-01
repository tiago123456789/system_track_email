import winston from "winston";
import EmailInterface from "../email/contracts/EmailInterface";
import BusinessLogicException from "../exceptions/BusinnessLogicException";
import CodeMessageException from "../exceptions/CodeMessageException";
import ResetPassword from "../models/ResetPassword";
import ResetPasswordInterface from "../repositories/contracts/ResetPasswordInterface";
import Uuid from "../utils/Uuid";
import UserService from "./UserService";

export default class ResetPasswordService {

    constructor(
        private readonly repository: ResetPasswordInterface,
        private readonly userService: UserService,
        private readonly logger: winston.Logger,
        private readonly uuid: Uuid,
        private readonly email: EmailInterface
    ) { 
    }

    async create(resetPassword: ResetPassword) {
        this.logger.info({ uuid: this.uuid.get(), message: `Creating reset password link for email ${resetPassword.email}`});

        // @ts-ignore
        const userWithEmail = await this.userService.findByEmail(resetPassword.email);
        if (!userWithEmail) {
            throw new BusinessLogicException(CodeMessageException.NO_RESET_PASSWORD);
        }

        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);
        resetPassword.token = this.uuid.get();
        resetPassword.timeExpiration = currentDate;
        resetPassword.userId = userWithEmail.id;

        await this.repository.create(resetPassword);
        await this.email
            // @ts-ignore
            .withFrom(process.env.EMAIL_FROM)
            .withSubject("Reset password")
            // @ts-ignore
            .withTo(resetPassword.email)
            .withHtml(`<a href=${process.env.URL_FRONTEND}${resetPassword.token}>Reset password</a>`)
            .send();

        this.logger.info({ uuid: this.uuid.get(), message: `Created reset password link for email ${resetPassword.email}`});
    }

    async isTokenNotExpired(token: string) {
        this.logger.info({ uuid: this.uuid.get(), message: `Created reset password link`});
        const resetPassword = await this.repository.findByToken(token);
        if (!resetPassword) {
            throw new BusinessLogicException(CodeMessageException.RESET_LINK_INVALID);
        }

        const timeExpiration = new Date(resetPassword.time_expiration);
        const currentDate = new Date();
        const isResetPasswordLinkExpired = timeExpiration < currentDate;
        if (isResetPasswordLinkExpired) {
            throw new BusinessLogicException(CodeMessageException.RESET_LINK_INVALID);
        }

        return true;
    }



}