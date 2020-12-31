import "pusher-js"

export default class RealtimeNotificationService {

    constructor() {
        Pusher.logToConsole = REACT_APP_PUSHER_DEBUGGER;
        this._pusher = new Pusher(REACT_APP_PUSHER_KEY, {
            cluster: REACT_APP_PUSHER_CLUSTER
        });
    }
    
    listen(channel, event, callback) {
        channel = this._pusher.subscribe(channel);
        channel.bind(event, callback);
        return this;
    }
}