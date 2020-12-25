import { Express } from "express";
import handlerExceptionMiddleware from "../middlewares/HandlerExceptionMiddleware";
import UserEndpointFactory from "../factories/UserEndpointFactory";
import AuthEndpointFactory from "../factories/AuthEndpointFactory";

const userEndpoint = new UserEndpointFactory().make({});
const authEndpoint = new AuthEndpointFactory().make({});

export default (app: Express) => {

    app.get("/", (request, response) => response.json({ msg: "It's work!!!"}))

    app.post("/users", userEndpoint.create);

    app.post("/auth", authEndpoint.authenticate);

    app.get("/emails/tracking/open", (request, response) => {
        let buf = new Buffer(30);
        response.writeHead(200, { 'Content-Type': 'image/gif' });
        response.end(buf, 'binary');
    });

    app.get("/emails/tracking/click", (request, response) => {
        const query : any = request.query;
        response.redirect(query.url);
    });

    app.post("/emails", (request, response) => {
        const datas = request.body;
        datas.body += `<img src='${process.env.APP_URL}/emails/tracking/open' >`;
        let url_tracking = `${process.env.APP_URL}/emails/tracking/click?url=`;
        let regex = /<a href="(.*?)"/g;
        datas.body = datas.body.replace(regex, `<a href='${url_tracking}$1'`);
        response.json(datas);
    });


    // Handler exceptions in application.
    app.use(handlerExceptionMiddleware)
}