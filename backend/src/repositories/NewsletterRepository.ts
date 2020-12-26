import connection from "../config/Database";
import Newsletter from "../models/Newsletter";
import NewsletterRepositoryInterface from "./contracts/NewsletterRepositoryInterface";

export default class NewsletterRepository implements NewsletterRepositoryInterface {

    private model: any;

    constructor() {
        this.model = connection("newsletters");
    }

    findByName(name: string): Promise<any> {
        const register = this.model.where("name", "=", name).select().limit(1); 
        return register[0] || null;
    }
    
    create(newsletter: Newsletter): Promise<any> {
       return this.model.insert({
           name: newsletter.name,
           user_id: newsletter.userId
       })  
    }

}
