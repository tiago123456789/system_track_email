import NotificationInterface from "./contracts/NotificationInterface";
import Pusher from "pusher";

export default class WebsocketNotification implements NotificationInterface {

    private pusher: Pusher;

    constructor() {

        this.pusher = new Pusher({
          // @ts-ignore
          appId: process.env.PUSHER_APPID,
          // @ts-ignore
          key: process.env.PUSHER_KEY,
          // @ts-ignore
          secret: process.env.PUSHER_SECRET,
          // @ts-ignore
          cluster: process.env.PUSHER_CLUSTER,
          // @ts-ignore
          useTLS: process.env.PUSHER_TLS
        });
    
    }

    notify(datas: any): Promise<any> {
        return this.pusher.trigger(datas["channel"], datas["event"], datas["data"]);
    }

}