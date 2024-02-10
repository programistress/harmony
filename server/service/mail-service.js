const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const SMTPTransport = require("nodemailer-smtp-transport");

class MailService {
  constructor() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground" // Redirect URL for testing
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken();

    this.transporter = nodemailer.createTransport(
      new SMTPTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.SMTP_USER,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: accessToken
        }
      })
    );
  }

  async sendActivationMail(to, link) {
    // Email to which we send the letter and a link that will be sent
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
