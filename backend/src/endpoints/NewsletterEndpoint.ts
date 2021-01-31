import { NextFunction, Request, Response }  from "express";
import Email from "../models/Email";
import Newsletter from "../models/Newsletter";
import Subscriber from "../models/Subscriber";
import NewsletterService from "../services/NewsletterService";
import EmailNewsletterValidation from "./validations/EmaiNewsletterlValidation";
import NewsletterValidation from "./validations/NewsletterValidation";
import SubscriberValidation from "./validations/SubscriberValidation";

export default class NewsletterEndpoint {

    constructor(
        private readonly newsletterService: NewsletterService
    ) {
        this.create = this.create.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this); 
        this.publish = this.publish.bind(this);
        this.getAllByUserId = this.getAllByUserId.bind(this);
    }

    public async publish(request: Request, response: Response, next: NextFunction) {
        try {
            const id: any = request.params.id;
            const emailNewsletter: Email = request.body;
            // @ts-ignore
            EmailNewsletterValidation.validate(emailNewsletter);
            // @ts-ignore
            emailNewsletter.userId = request.userId
            await this.newsletterService.publish(id, emailNewsletter);
            response.sendStatus(200);
        } catch(error) {
            next(error);
        }
    }

    public async subscribe(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const newSubscribe: Subscriber = request.body;
            // @ts-ignore
            newSubscribe.newsletterId = id;
            SubscriberValidation.validate(newSubscribe);
            await this.newsletterService.subscribe(newSubscribe);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    public async getAllByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const newsletters = await this.newsletterService.getAllByUserId(request.userId);
            response.json(newsletters);
        } catch(error) {
            next(error); 
        }
    }

    public async unsubscribe(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const newsletterId = request.params.newsletterId;
            // @ts-ignore
            await this.newsletterService.unsubscribe(id, newsletterId);
            response.sendStatus(204);
        } catch(error) {
            next(error); 
        }
    }

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newNewsletter: Newsletter = request.body;
            // @ts-ignore
            newNewsletter.userId = request.userId;
            NewsletterValidation.validate(newNewsletter);
            const newsletterCreated = await this.newsletterService.create(newNewsletter);
            response.status(201).json(newsletterCreated);
        } catch(error) {
            next(error);
        }
    }
}