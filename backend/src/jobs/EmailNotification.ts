import ConsumerFactory from "../factories/ConsumerFactory";
import EmailFactory from "../factories/EmailFactory";
import logger from "../config/Logger";
import EmailServiceFactory from "../factories/EmailServiceFactory";
import StatusScheduleEmail from "../models/StatusScheduleEmail";
import UserServiceFactory from "../factories/UserServiceFactory";
import TrackerActionService from "../services/TrackerActionService";

const consumer = new ConsumerFactory()
    .make({ queueUrl: process.env.QUEUE_URL_NOTIFICATION });

const emailService = new EmailServiceFactory().make({});
const userService = new UserServiceFactory().make({});
const trackActionService = new TrackerActionService();
    
setInterval(() => {
    consumer.consume(async (message: any) => {
        if (message.isEmailScheduleded) {
            await emailService.updateEmailScheduleded(message.emailScheduleId, StatusScheduleEmail.PROCESSING);
            const email = await emailService.findById(message.emailId);
            const user = await userService.findById(email.user_id);
            message.from = user.email;
            message.to = email.to;
            message.subject = email.subject;
            message.body = trackActionService.applyTrackingClickAndOpen(email);
        }

        logger.info({ uuid: message.uuid, message: `Sending email to ${message.to}`});
        const email: any = message
        await new EmailFactory()
            .make({})
            .withTo(email.to)
            .withSubject(email.subject)
            .withFrom(email.from)
            .withHtml(email.body)
            .send();
        logger.info({ uuid: message.uuid, message: `Sended email to ${message.to} with success.`})
        if (message.isEmailScheduleded) {
            await emailService.updateEmailScheduleded(message.emailScheduleId, StatusScheduleEmail.PROCESSED);
        }
    });
}, 3000)
