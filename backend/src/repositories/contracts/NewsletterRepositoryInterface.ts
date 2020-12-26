import Newsletter from "../../models/Newsletter";

export default interface NewsletterRepositoryInterface {

    create(newsletter: Newsletter): Promise<any>;

    findByName(name: string): Promise<any>;

}
