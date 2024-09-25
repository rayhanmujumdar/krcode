"use server";
import nodeMailer, { SendMailOptions, TransportOptions } from "nodemailer";

console.log("SMTP_HOST:", process.env.SMTP_HOST);

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as TransportOptions);

transporter.verify((err) => {
  if (err) {
    console.error("Failed to verify SMTP connection:", err);
  } else {
    console.log(`Server is ready to take our messages`);
  }
});

export const MailSender = async (mailOptions: SendMailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err: any) {
    console.log(err.message);
  }
};
