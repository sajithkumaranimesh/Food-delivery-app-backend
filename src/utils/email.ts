import nodemailer from "nodemailer";
import { MailOption } from "../dto/MailOption";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendEmail = async (options: MailOption):Promise<void> => {
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as SMTPTransport.Options);

  const mailOption = {
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transpoter.sendMail(mailOption);
};

export default sendEmail;
