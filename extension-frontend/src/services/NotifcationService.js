export default class NotificationService {

    notify(data) {
        new Notification("Message readed", {
            body: data.message,
        });
    }
}