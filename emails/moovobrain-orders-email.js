const mailer = require('./nodemailer-sender');

const send = function (order) {
    const email = {
        subject: 'Bank transfer instructions',
        to: order.iEmail || order.oEmail,
        template: `
<center><h4>Bank transfer instructions</h4><center>
<p style="text-align: left;">
1- Transfer money to the following bank account number mentioned in the transfer form.<br>
2- After transferring the money please attach slip and fill in transfer date and time.
<br><br>
Your order will be confirmed after bank transfer transaction using this <a href="${process.env.WEBSITE_URL}/moovobrain-payment/${order._id}">link</a>.
<br>
please perform payment and confirm withing two week from now. otherwise , this order will be cancelled automatically.
<br>
have a nice day , Gewinner. 
</p>
`,
    };
    return mailer.send(email);
}

/*
   Use the function below to test emails
 */

// send({email : 'ahmed.michrgui@hotmail.fr'}).then(() => {
//     console.log('email sent');
// }).catch((error) => {
//     console.log(error);
// });

module.exports = {send};
