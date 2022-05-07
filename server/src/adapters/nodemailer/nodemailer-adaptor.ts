import { MailAdapter, SendMailData,  } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f950aa5b18f9c1",
      pass: "fcd6d0d23c27f1"
    }
  });

export class NodeMailerAdapter implements MailAdapter{
    
    async sendMail({subject, body}:SendMailData) {
        
        await transport.sendMail({
        from:'Equipe Feedget <h@gamajd.com>',
        to:'Ruan Mendonça <ruan.thow3@gmail.com>',
        subject: subject,
        html: body
    })

    };
}