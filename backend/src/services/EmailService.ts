import EmailInterface from "../email/contracts/EmailInterface";
import Email from "../models/Email";
import SubscriberNewsletter from "../models/SubscriberNewsletter";
import TrackActionEmail from "../models/TrackActionEmail";
import ProducerInterface from "../queue/contracts/ProducerInterface";
import EmailMessage from "../queue/messages/EmailMessage";
import EmailRepositoryInterface from "../repositories/contracts/EmailRepositoryInterface";
import Uuid from "../utils/Uuid";
import TrackerActionService from "./TrackerActionService";
import logger from "../config/Logger";

export default class EmailService {

    constructor(
        private readonly repository: EmailRepositoryInterface,
        private readonly email: EmailInterface,
        private readonly trackerActionService: TrackerActionService,
        private readonly producer: ProducerInterface
    ) { }

    getAllByUserId(userId: Number): Promise<any> {
        return this.repository.getAllByUserId(userId);
    }

    trackClick(trackActionEmail: TrackActionEmail): Promise<any> {
        return this.repository.trackClick(trackActionEmail);
    }

    trackOpen(trackActionEmail: TrackActionEmail): Promise<any> {
        return this.repository.trackOpen(trackActionEmail);
    }

    async publishEmailOfNewsletter(email: Email, subscriberNewsletter: SubscriberNewsletter) {
        const emailId = email.id;
        email.body = this.trackerActionService.applyTrackingClickAndOpen(email, emailId);
        email.body += `<br/><a style="background-color: red; padding: 10px; text-decoration: none; color: black; border-radius: 5px;" href="${process.env.APP_URL}/newsletters/${subscriberNewsletter.newsletterId}/subscribers/${subscriberNewsletter.subscribeId}" target="_blank">Unsubscribe</a>`;
        const uuid = Uuid.get();
        logger.info({ uuid: uuid, message: `Publishing email of newsletter ${subscriberNewsletter.newsletterId}`});
        return this.producer.publish(
            // @ts-ignore
            new EmailMessage(email.from, email.to, email.subject, email.body, uuid)
        )
    }

    async createRegister(email: Email): Promise<Email> {
        let emailId = await this.repository.create(email);
        emailId = emailId[0];
        email.id = emailId;
        return email;
    }

    async create(email: Email) {
        let emailId = await this.repository.create(email);
        emailId = emailId[0];
        email.body = this.trackerActionService.applyTrackingClickAndOpen(email, emailId);
        const uuid = Uuid.get();
        logger.info({ uuid: uuid, message: `Create email and send to ${email.to}`});
        return this.producer.publish(
            // @ts-ignore
            new EmailMessage(email.from, email.to, email.subject, email.body, uuid)
        )
    }
}