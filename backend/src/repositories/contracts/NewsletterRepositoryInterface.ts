import Newsletter from "../../models/Newsletter";
import Subscriber from "../../models/Subscriber";

export default interface NewsletterRepositoryInterface {

    create(newsletter: Newsletter): Promise<any>;

    findByName(name: string): Promise<any>;

    findById(id: Number): Promise<any>;

    getSubscribersInNewsletter(newsltterId: Number): Promise<any>;

    subscribe(subscriber: Subscriber): Promise<any>;

    unsubscribe(id: Number): Promise<any>;

    relateNewsletterWithEmail(newsletterId: Number, emailId: Number): Promise<any>;

    getAllByUserId(userId: Number): Promise<any>;
}
