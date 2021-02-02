import { NextFunction, Request, Response } from "express";
import EmailValidation from "./validations/EmailValidation";
import EmailService from "../services/EmailService";
import Email from "../models/Email";
import TrackActionEmail from "../models/TrackActionEmail";
import UserService from "../services/UserService";
import NotificationInterface from "../notifications/contracts/NotificationInterface";

export default class EmailEndpoint {

    constructor(
        private readonly emailService: EmailService,
        private readonly userService: UserService,
        private readonly websocketNotification: NotificationInterface
    ) {
        this.create = this.create.bind(this);
        this.trackClick = this.trackClick.bind(this);
        this.trackOpen = this.trackOpen.bind(this);
        this.getAllByUserId = this.getAllByUserId.bind(this);
        this.getActionsTrackedByEmailId = this.getActionsTrackedByEmailId.bind(this);
    }

    public async getActionsTrackedByEmailId(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            // @ts-ignore
            const actionsTracked = await this.emailService.getActionsTrackByEmailId(id);
            response.json(actionsTracked);
        } catch (error) {
            next(error);
        }
    }

    public async trackClick(request: Request, response: Response, next: NextFunction) {
        try {
            const { link, id, to, userId }: any = request.query;
            const trackActionEmail: TrackActionEmail = new TrackActionEmail(
                id, to, "click", link
            );
            await this.emailService.trackClick(trackActionEmail);
            const user = await this.userService.findById(userId);
            await this.websocketNotification.notify({
                // @ts-ignore
                "channel": "app", "event": user["token"], data: {
                    message: `${to} clicked in ${link} on email ✓✓`
                }
            });
            response.redirect(link);
        } catch (error) {
            next(error);
        }
    }

    public async trackOpen(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, to, userId }: any = request.query;
            const trackActionEmail: TrackActionEmail = new TrackActionEmail(
                id, to, "click", null
            );
            await this.emailService.trackOpen(trackActionEmail);
            const user = await this.userService.findById(userId);
            await this.websocketNotification.notify({
                // @ts-ignore
                "channel": "app", "event": user["token"], data: {
                    message: `${to} readed email ✓✓`
                }
            });
            let buf = new Buffer(30);
            response.writeHead(200, { 'Content-Type': 'image/gif' });
            return response.end(buf, 'binary');
        } catch (error) {
            next(error);
        }
    }


    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            let newEmail: Email = request.body;
            EmailValidation.validate(newEmail);
            newEmail = new Email(
                // @ts-ignore
                newEmail.subject, request.email,
                newEmail.to, newEmail.body,
                // @ts-ignore
                request.userId
            );
            await this.emailService.create(newEmail);
            response.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    public async getAllByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const emails = await this.emailService.getAllByUserId(request.userId);
            response.json(emails);
        } catch (error) {
            next(error);
        }
    }
}