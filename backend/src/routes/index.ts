import { Express } from "express";
import handlerExceptionMiddleware from "../middlewares/HandlerExceptionMiddleware";
import UserEndpointFactory from "../factories/UserEndpointFactory";
import AuthEndpointFactory from "../factories/AuthEndpointFactory";
import EmailEndpointFactory from "../factories/EmailEndpointFactory";
import authorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import getUserAuthenticatedMiddleware from "../middlewares/GetUserAuthenticatedMiddleware";
import NewsletterEndpointFactory from "../factories/NewsletterEndpointFactory";

const userEndpoint = new UserEndpointFactory().make({});
const authEndpoint = new AuthEndpointFactory().make({});
const emailEndpoint = new EmailEndpointFactory().make({});
const newsletterEndpoint = new NewsletterEndpointFactory().make({});

export default (app: Express) => {

    app.get("/", (request, response) => response.json({ msg: "It's work!!!"}))

    app.post("/users", userEndpoint.create);

    app.post("/auth", authEndpoint.authenticate);

    app.get("/emails/tracking/open", emailEndpoint.trackOpen);
    app.get("/emails/tracking/click", emailEndpoint.trackClick);
    app.post("/emails", 
        authorizationMiddleware.hasPermission(["create_email"]),
        getUserAuthenticatedMiddleware,
        emailEndpoint.create);


    app.post("/newsletters", 
        authorizationMiddleware.hasPermission(["create_email"]),
        getUserAuthenticatedMiddleware,
        newsletterEndpoint.create);



    // Handler exceptions in application.
    app.use(handlerExceptionMiddleware)
}