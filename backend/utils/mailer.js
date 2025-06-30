import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });
    console.log(to, subject, message, "email sent successfully");
    const info = await transporter.sendMail({
      from: "Inngest TMS",
      to,
      subject,
      text: message,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};
