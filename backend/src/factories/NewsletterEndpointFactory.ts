import EmailEndpoint from "../endpoints/EmailEndpoint";
import NewsletterEndpoint from "../endpoints/NewsletterEndpoint";
import NewsletterService from "../services/NewsletterService";
import FactoryInterface from "./FactoryInterface";
import NewsletterServiceFactory from "./NewsletterServiceFactory";

export default class NewsletterEndpointFactory implements FactoryInterface<NewsletterEndpoint> {

    make(values: { [key: string]: any; }): NewsletterEndpoint {
        return new NewsletterEndpoint(
            new NewsletterServiceFactory().make({})
        );
    }

}