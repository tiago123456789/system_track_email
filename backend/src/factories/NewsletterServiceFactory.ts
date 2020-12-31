import NewsletterService from "../services/NewsletterService";
import EmailServiceFactory from "./EmailServiceFactory";
import FactoryInterface from "./FactoryInterface";
import NewsletterRepositoryFactory from "./NewsletterRepositoryFactory";

export default class NewsletterServiceFactory implements FactoryInterface<NewsletterService> {
   
    make(values: { [key: string]: any; }): NewsletterService {
        return new NewsletterService(
            new NewsletterRepositoryFactory().make({}),
            new EmailServiceFactory().make({})
        )
    }

}