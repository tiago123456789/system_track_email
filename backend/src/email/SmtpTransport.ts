import TransportInterface from "./contracts/TransportInterface";
import nodemailer from "nodemailer";

export default class SmtpTransport implements TransportInterface {

    create(datas: { [key: string]: any; }): any {
        return nodemailer.createTransport({
            // @ts-ignore
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,  
            // secure: process.env.EMAIL_TLS, 
            auth: {
              user: process.env.EMAIL_AUTH_USER, 
              pass: process.env.EMAIL_AUTH_PASSWORD,
            },
          });
    }

}