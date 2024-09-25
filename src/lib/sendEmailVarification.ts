import { MailSender } from "./MailSender";

export const sendEmailVerification = async (user: {
  email: string;
  name: string;
  token: string;
}) => {
  const verificationURL = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${user.token}`;
  const mailOptions = {
    from: '"KR Blog" <krblog@gmail.com>',
    to: user.email,
    subject: "Please verify your email",
    html: `<p>Hello ${user.name},</p>
               <p>Thank you for registering. Please verify your email by clicking on the link below:</p>
               <a href="${verificationURL}">Verify your email</a>
               <p>This link will expire in 30 minutes.</p>`,
  };
  try {
    const info = await MailSender(mailOptions);
    return info;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};
