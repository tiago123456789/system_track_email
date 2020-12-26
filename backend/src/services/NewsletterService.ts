import BusinessLogicException from "../exceptions/BusinnessLogicException";
import CodeMessageException from "../exceptions/CodeMessageException";
import Newsletter from "../models/Newsletter";
import NewsletterRepositoryInterface from "../repositories/contracts/NewsletterRepositoryInterface";

export default class NewsletterService  {

    constructor(private readonly repository: NewsletterRepositoryInterface) {}

    async create(newsletter: Newsletter): Promise<any> {
        const newsletterWithName = await this.repository.findByName(newsletter.name);
        if (newsletterWithName) {
            throw new BusinessLogicException(CodeMessageException.NEWSLETTER_NAME_EXIST);
        }
        return this.repository.create(newsletter);
    }

}