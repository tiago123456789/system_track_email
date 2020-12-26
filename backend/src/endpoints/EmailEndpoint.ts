import { NextFunction, Request, Response }  from "express";
import EmailValidation from "./validations/EmailValidation";
import EmailService from "../services/EmailService";
import Email from "../models/Email";
import TrackActionEmail from "../models/TrackActionEmail";

export default class EmailEndpoint {

    constructor(
        private readonly emailService: EmailService,
    ) {
        this.create = this.create.bind(this);
        this.trackClick = this.trackClick.bind(this);
        this.trackOpen = this.trackOpen.bind(this);
    }

    public async trackClick(request: Request, response: Response, next: NextFunction) {
        try {
            const { link, id, to } : any = request.query;
            const trackActionEmail: TrackActionEmail = new TrackActionEmail(
                id, to, "click", link
            );
            await this.emailService.trackClick(trackActionEmail);
            response.redirect(link);
        } catch(error) {
            next(error);
        }
    }

    public async trackOpen(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, to } : any = request.query;
            const trackActionEmail: TrackActionEmail = new TrackActionEmail(
                id, to, "click", null
            );
            await this.emailService.trackOpen(trackActionEmail);
            let buf = new Buffer(30);
            response.writeHead(200, { 'Content-Type': 'image/gif' });
            return response.end(buf, 'binary');
        } catch(error) {
            next(error);
        }
    }


    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            let newEmail: Email = request.body;
            EmailValidation.validate(newEmail);
            newEmail = new Email(
                newEmail.subject, newEmail.from,
                newEmail.to, newEmail.body,
                // @ts-ignore
                request.userId
            );
            await this.emailService.create(newEmail);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }
}