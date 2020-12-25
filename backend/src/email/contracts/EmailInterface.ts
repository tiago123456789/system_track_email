export default interface EmailInterface {

    withFrom(from: string): EmailInterface;

    withTo(to: string): EmailInterface;

    withSubject(subject: string): EmailInterface;

    withText(text: string): EmailInterface;

    withHtml(html: string): EmailInterface;

    send(): Promise<any>;
}