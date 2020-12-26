import Email from "../models/Email";

export default class TrackerActionService {

    applyTrackingClickAndOpen(email: Email, emailId: Number) {
        email.body += `<img src='${process.env.APP_URL}/emails/tracking/open?id=${emailId}&to=${email.to}' />`;
        let urlTrackingClick = `${process.env.APP_URL}/emails/tracking/click?id=${emailId}&to=${email.to}&link=`;
        let regex = /<a href="(.*?)"/g;
        return email.body.replace(regex, `<a href='${urlTrackingClick}$1'`);
    }
}