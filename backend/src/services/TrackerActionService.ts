import Email from "../models/Email";

export default class TrackerActionService {

    applyTrackingClickAndOpen(email: Email, emailId?: Number) {
        email.body += `<img style="display: none" src='${process.env.APP_URL}/emails/tracking/open?id=${emailId}&to=${email.to}&userId=${email.userId}' />`;
        let urlTrackingClick = `${process.env.APP_URL}/emails/tracking/click?id=${emailId}&to=${email.to}&userId=${email.userId}&link=`;
        let regex = /<a href="(.*?)"/g;
        return email.body.replace(regex, `<a href='${urlTrackingClick}$1'`);
    }
}