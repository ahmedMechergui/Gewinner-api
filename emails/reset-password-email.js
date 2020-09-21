const mailer = require('./nodemailer-sender');
const mongoose = require('mongoose');


const send = function (client) {

    const email = {
        to: client.email,
        subject: 'Reset password',
        template: '<h4>Hello ' + client.name + '</h4>' +
            '<p>' +
            'You recently requested to reset your password for your Gewinner account. ' +
            'Click the link below to reset it. This password reset is only valid for the next 3 hours.' +
            '<br><a style="color: #68a4c4" href="' + process.env.WEBSITE_URL + '/reset/' + client.resetPasswordID + '">Click Here' + '</a></p>',
    }

    return mailer.send(email);
}
module.exports = {send}
