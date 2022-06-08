import nodemailer, { createTestAccount } from 'nodemailer';
import HandleBarsMailTemplate from './HandlebarsMailTemplate';
interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariable;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {

    
    static async sendMail({to,from, subject,templateData}: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandleBarsMailTemplate();
        const transporter = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Sales Team',
                address: from?.email || 'team@apisales.com.br',
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }



}