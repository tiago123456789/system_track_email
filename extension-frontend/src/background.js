import AuthService from "./services/AuthService";
import RealtimeNotificationService from "./services/RealtimeNotificationService";
import NotificationService from "./services/NotifcationService";

const authService = new AuthService();
const realtimeService = new RealtimeNotificationService();
const notificationService = new NotificationService();

function notifyReadedAndOpenedEmails() {
    if (!authService.isAuthenticated()) {
        return;
    }

    realtimeService.listen(
        "app",
        authService.getToken(),
        notificationService.notify);
}

chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function () {
        notifyReadedAndOpenedEmails();
    });
});
