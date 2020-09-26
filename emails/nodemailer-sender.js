const nodemailer = require('nodemailer');

let transporter =  nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        ciphers: 'SSLv3'
    },
});

const send = async function (mail) {
   try{
       await transporter.sendMail({
           from: (mail.from || 'Gewinner team') + '<loremipsum789546@outlook.com>',
           to: mail.to,
           subject: mail.subject,
           html: mail.template,
       });
   }catch (e) {
       throw new Error();
   }

}


// send({
//     subject: 'this is the subject',
//     template: '<h1>This is the email text from gewinner API</h1>',
//     to: 'ahmed.michrgui@hotmail.fr',
//     from : 'lorem@gmail.com'
// }).then();

module.exports = {send};
