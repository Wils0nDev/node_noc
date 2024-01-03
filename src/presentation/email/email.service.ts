import nodemailer from 'nodemailer'
import {envs} from '../../config/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to:string | string[];
    subject : string;
    htmlBody:string;
   attachments : Attachments[]
}
interface  Attachments {
    filename : string;
    path : string
}
export class EmailServices {


    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user : envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor( 
    ){}

    async sendEmail(options:SendMailOptions):Promise<boolean>{

        const { to,subject, htmlBody, attachments = []} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments : attachments
            })
            //console.log(sentInformation)
            const log = new LogEntity({
                level : LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            });

            return true;
        } catch (error) {

            const log = new LogEntity({
                level : LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            });

            return false;
        }

    }

    async sendEmailWithFileSystemLogs( to: string | string []) : Promise<boolean> {

        const subject = 'Logs del servidor';
        const htmlBody = `<h2>Logs de sistema - NOC </h2>
        <p>Nulla occaecat ullamco eiusmod aliqua proident aliquip voluptate aliqua sit in deserunt mollit.</p>
        <p>Ver los adjuntos</p> ` 
        const attachments : Attachments[] = [
            {
                filename : 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename : 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename : 'logs-medium.log',
                path: './logs/logs-medium.log'
            }
        ];

       const isSend =  this.sendEmail({
            to,subject,htmlBody,attachments
        })

        return isSend;
    }
}