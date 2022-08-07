const nodemailer = require("nodemailer");

// send mail
const sendEmail = (to, url, name, txt) => {

  const smtpTransport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  const sender = { name: process.env.SENDER_NAME, email: process.env.SENDER_EMAIL };

  const mailOptions = {
    from: sender,
    to: to,
    subject: "Edu Space Activation mail",
    html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <img src="https://i.imgur.com/4jq68uE.png" alt style="display: block; margin:auto;" width="205"; >
      <h2 style="text-align: center; text-transform: uppercase;color: rgb(37, 132, 214);">Welcome to EduSpace.</h2>
      Hey <strong> ${name},</strong>
      Thanks for signing up at EduSpace.   
      To complete your registration, please confirm your email <strong>${to}</strong> by clicking the following button:
      
      <div style="text-align:center">   
        <a href=${url} style="background: rgb(37, 132, 214); text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
      </div>
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
      <a style="display:block;word-break: break-all;" href=${url} target="_blank">${url}</a>
      </div>
      `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    console.log(err);
    if (err) return err;
    return infor;
  });
  console.log("Send Mail");
};

module.exports = sendEmail;
