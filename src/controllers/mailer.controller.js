const nodemailer = require('nodemailer');

exports.sendMail = async (receiver) => {
    const receivers = ["bsahraoui.mail@gmail.com", receiver];
    let transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_PORT == 465 ? true : false,
        auth: {
            user: "api@ykorp.com", //Ne marchent pas en env
            pass: "Api213ykorp!"
        }
    });

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: receivers,
        subject: 'Welcome to our platform!',
        text: 'Thank you for registering on our platform!',
        html: '<h1>Welcome to Freelance</h1><p>Thank you for registering on our platform!</p>'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
    });

    return mailOptions;
}