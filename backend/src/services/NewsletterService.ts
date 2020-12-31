import BusinessLogicException from "../exceptions/BusinnessLogicException";
import CodeMessageException from "../exceptions/CodeMessageException";
import NotFoundException from "../exceptions/NotFoundException";
import Email from "../models/Email";
import Newsletter from "../models/Newsletter";
import Subscriber from "../models/Subscriber";
import SubscriberNewsletter from "../models/SubscriberNewsletter";
import NewsletterRepositoryInterface from "../repositories/contracts/NewsletterRepositoryInterface";
import EmailService from "./EmailService";

export default class NewsletterService  {

    constructor(
        private readonly repository: NewsletterRepositoryInterface,
        private readonly emailService: EmailService
    ) {}

    async create(newsletter: Newsletter): Promise<any> {
        const newsletterWithName = await this.repository.findByName(newsletter.name);
        if (newsletterWithName) {
            throw new BusinessLogicException(CodeMessageException.NEWSLETTER_NAME_EXIST);
        }
        return this.repository.create(newsletter);
    }

    async publish(id: Number, email: Email) {
        const newsletter = await this.findById(id);
        const subscribers = await this.repository.getSubscribersInNewsletter(id);
        email = await this.emailService.createRegister(email);
        await this.repository.relateNewsletterWithEmail(
            // @ts-ignore
            id, email.id
        );
        return Promise.all(subscribers.map(async (subscriber: any) => {
            email.to = subscriber.email;
            await this.emailService.publishEmailOfNewsletter(
                email, new SubscriberNewsletter(subscriber.id, newsletter.id)
            );
        }));
    }

    async unsubscribe(id: Number, newsletterId: Number) {
        await this.findById(newsletterId);
        return this.repository.unsubscribe(id);
    }

    async subscribe(subscriber: Subscriber) {
        await this.findById(subscriber.newsletterId);
        return this.repository.subscribe(subscriber)
    }

    private async findById(id: Number) {
        const newsletter = await this.repository.findById(id);
        if (!newsletter) {
            throw new NotFoundException("Not found register!");
        }
        return newsletter;
    }

}