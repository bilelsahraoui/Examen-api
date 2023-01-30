const nodemailer = require('nodemailer');

exports.sendMail = async (receiver, mail, isRegister) => {

    const receivers = [];

    if(isRegister){
        receivers = [process.env.APP_ADMIN_EMAIL];
        if(Array.isArray(receiver)){
            receiver.forEach(email => {
                receivers.push(email);
            });
        }else{
            receivers.push(receiver);
        }
    }
    if(!isRegister){
        receivers.push(receiver);
    }
    
    let transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_PORT == 465 ? true : false,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: receivers,
        subject: mail.subject,
        text: mail.text,
        html: mail.html
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
    });

    return mailOptions;
}