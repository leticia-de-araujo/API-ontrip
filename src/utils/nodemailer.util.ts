import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email/email";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const sendEmail = async ({
  subject,
  text,
  to,
}: IEmailRequest): Promise<boolean> => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      return "Email send with success";
    })
    .catch((err) => {
      throw new AppError(
        500,
        "Internal server error sending email, try again later"
      );
    });
  return true;
};

export { sendEmail };
