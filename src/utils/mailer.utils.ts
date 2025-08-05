import nodemailer, { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gautamkohar110@gmail.com",
    pass: "gau",
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
    from: `"BA Education Foundation" <gautamkohar110@gmail.com>`,
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
