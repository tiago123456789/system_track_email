import EmailInterface from "./contracts/EmailInterface";
import TransportInterface from "./contracts/TransportInterface";

export default class Email implements EmailInterface {

    private from: string|null = null;
    
    private to: string|null = null;
    
    private subject: string|null = null;
    
    private text: string|null = null;
    
    private html: string|null = null;

    constructor(private readonly transport: TransportInterface) {

    }

    withFrom(from: string): EmailInterface {
        this.from = from;
        return this;
    }

    withTo(to: string): EmailInterface {
        this.to = to;
        return this;
    }

    withSubject(subject: string): EmailInterface {
        this.subject = subject;
        return this;
    }

    withText(text: string): EmailInterface {
        this.text = text;
        return this;
    }

    withHtml(html: string): EmailInterface {
        this.html = html;
        return this;
    }

    send(): Promise<any> {
        let email: any = {
            from: this.from,
            to: this.to,
            subject: this.subject
        }

        if (this.html) {
            email.html = this.html;
        } else {
            email.text = this.text;
        }

        return this.transport.create({}).sendMail(email)
    }

}