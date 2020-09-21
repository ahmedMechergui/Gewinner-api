const mailer = require('./nodemailer-sender');

const send = function (body) {
const email = {
    to : process.env.EMAIL_ADDRESS,
    subject : body.subject,
    template : '<p>'+body.message+'<br><br>From : '+body.email+'</p>',
    from : body.name
}

return mailer.send(email);
}

module.exports = {send}
