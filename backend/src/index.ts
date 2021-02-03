import app from "./config/Server";
import Scheduler from "./scheduler/Scheduler";
import EmailServiceFactory from "./factories/EmailServiceFactory";
import ProducerFactory from "./factories/ProducerFactory";
import EmailMessage from "./queue/messages/EmailMessage";
import Uuid from "./utils/Uuid";

const producer = new ProducerFactory().make({ queueUrl: process.env.QUEUE_URL_NOTIFICATION });
const emailService = new EmailServiceFactory().make({});

new Scheduler().register('*/1 * * * *', async function() {
    const emailsScheduleded = await emailService.getEmailsSchedulededs();
    emailsScheduleded.map((item: any) => {
        producer.publish(new EmailMessage('', '', '', '', Uuid.get(), true, item.email_id, item.id))
    });
});

app.listen(process.env.PORT, (): void => {
    console.log(`The server is running in address: ${process.env.APP_URL}`)
})