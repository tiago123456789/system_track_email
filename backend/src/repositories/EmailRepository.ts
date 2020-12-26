import connection from "../config/Database"
import Email from "../models/Email";
import TrackActionEmail from "../models/TrackActionEmail";
import EmailRepositoryInterface from "./contracts/EmailRepositoryInterface";

export default class EmailRepository implements EmailRepositoryInterface {

    private model: any;

    constructor() {
        this.model = connection("emails");
    }

    trackOpen(trackActionEmail: TrackActionEmail): Promise<any> {
        return connection("actions_tracked").insert({
            email_id: trackActionEmail.emailId,
            to: trackActionEmail.to,
            actions: "open",
        });
    }

    trackClick(trackActionEmail: TrackActionEmail): Promise<any> {
        return connection("actions_tracked").insert({
            email_id: trackActionEmail.emailId,
            actions: "click",
            to: trackActionEmail.to,
            link: trackActionEmail.link
        });
    }
    

    create(email: Email): Promise<any> {
        return this.model.insert({
            subject: email.subject,
            from: email.from,
            to: email.to,
            body: email.body,
            user_id: email.userId
        });
    }

}
