import connection from "../config/Database";
import Newsletter from "../models/Newsletter";
import Subscriber from "../models/Subscriber";
import NewsletterRepositoryInterface from "./contracts/NewsletterRepositoryInterface";

export default class NewsletterRepository implements NewsletterRepositoryInterface {

    constructor() { }

    relateNewsletterWithEmail(newsletterId: Number, emailId: Number): Promise<any> {
        return connection("newsletters_emails").insert({ 
            "newsletter_id": newsletterId, "email_id": emailId
        });
    }

    unsubscribe(id: Number): Promise<any> {
        return connection("subscribers").where("id", id).del();
    }

    getSubscribersInNewsletter(newsltterId: Number): Promise<any> {
        return connection("subscribers").where("newsletter_id", newsltterId).select();
    }

    subscribe(subscriber: Subscriber): Promise<any> {
        return connection("subscribers").insert({
            name: subscriber.name || null,
            email: subscriber.email,
            newsletter_id: subscriber.newsletterId
        });
    }

    async findById(id: Number): Promise<any> {
        const register  = await  connection("newsletters").where("id", id).select();
        return register[0] || null;
    }


    async findByName(name: string): Promise<any> {
        const register = await  connection("newsletters").where("name", "=", name).limit(1);
        return register[0] || null;
    }
    
    create(newsletter: Newsletter): Promise<any> {
       return  connection("newsletters").insert({
           name: newsletter.name,
           user_id: newsletter.userId
       })  
    }

}
