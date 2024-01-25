const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Set to true for secure (TLS) connection
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: { 
        rejectUnauthorized: false, 
        minVersion: "TLSv1", 
        ciphers: "SSLv3" 
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });
  }

  async sendActivationMail(to, link) {
    //email to which we send the letter and a link that will be sent
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Email verification for Harmony",
      text: "",
      html: `
      <div>
      <h1>For verifying your email please click this link:</h1>
      <a href='${link}'>${link}</a>
      </div>
      `,
    });
  }
}

module.exports = new MailService();
