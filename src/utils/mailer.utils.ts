import nodemailer, { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465 ? true : false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

type Mailer = {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[] | null;
  bcc?: string | string[] | null;
  attachments?: [] | null;
};

export const sendMail = async ({
  to,
  subject,
  html,
  attachments = null,
  cc = null,
  bcc = null,
}: Mailer) => {
  const message: SendMailOptions = {
    from: `"B A Coder Pvt. Ltd. " <gautamkohar110@gmail.com>`,
    to,
    subject,
    html,
  };

  if (cc) {
    message["cc"] = cc;
  }

  if (bcc) {
    message["bcc"] = bcc;
  }

  if (attachments) {
    message["attachments"] = attachments;
  }

  await transporter.sendMail(message);
};
