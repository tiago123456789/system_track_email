import { NextFunction, Request, Response }  from "express";
import Newsletter from "../models/Newsletter";
import NewsletterService from "../services/NewsletterService";
import NewsletterValidation from "./validations/NewsletterValidation";

export default class NewsletterEndpoint {

    constructor(
        private readonly newsletterService: NewsletterService
    ) {
        this.create = this.create.bind(this);
    }

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newNewsletter: Newsletter = request.body;
            // @ts-ignore
            newNewsletter.userId = request.userId;
            NewsletterValidation.validate(newNewsletter);
            await this.newsletterService.create(newNewsletter);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }
}