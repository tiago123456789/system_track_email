import NewsletterRepositoryInterface from "../repositories/contracts/NewsletterRepositoryInterface";
import NewsletterRepository from "../repositories/NewsletterRepository";
import FactoryInterface from "./FactoryInterface";

export default class NewsletterRepositoryFactory implements FactoryInterface<NewsletterRepositoryInterface> {

    make(values: { [key: string]: any; }): NewsletterRepositoryInterface {
        return new NewsletterRepository();
    }

}