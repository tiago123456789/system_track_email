import ConsumerFactory from "../factories/ConsumerFactory";
import EmailFactory from "../factories/EmailFactory";
import logger from "../config/Logger";

const consumer = new ConsumerFactory()
    .make({ queueUrl: process.env.QUEUE_URL_NOTIFICATION });
    
setInterval(() => {
    consumer.consume(async (message: any) => {
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
    });
}, 30000)
