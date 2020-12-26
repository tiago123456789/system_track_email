import EmailInterface from "../email/contracts/EmailInterface";
import Email from "../models/Email";
import TrackActionEmail from "../models/TrackActionEmail";
import EmailRepositoryInterface from "../repositories/contracts/EmailRepositoryInterface";
import TrackerActionService from "./TrackerActionService";

export default class EmailService {

    constructor(
        private readonly repository: EmailRepositoryInterface,
        private readonly email: EmailInterface,
        private readonly trackerActionService: TrackerActionService
    ) {}


    trackClick(trackActionEmail: TrackActionEmail): Promise<any> {
        return this.repository.trackClick(trackActionEmail);
    }

    trackOpen(trackActionEmail: TrackActionEmail): Promise<any> {
        return this.repository.trackOpen(trackActionEmail);
    }

    async create(email: Email) {
        let emailId = await this.repository.create(email);
        emailId = emailId[0];
        email.body = this.trackerActionService.applyTrackingClickAndOpen(email, emailId);
        await this.email
            .withFrom(email.from)
            .withTo(email.to)
            .withSubject(email.subject)
            .withText(email.body)
            .withHtml(email.body)
            .send();
    }
}