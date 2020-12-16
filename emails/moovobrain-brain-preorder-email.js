const mailer = require('./nodemailer-sender');

const send = function (order) {
    const email = {
        subject: 'THANK YOU FOR YOUR PRE-ORDER!',
        to: order.iEmail || order.oEmail,
        template: `
Hi <strong>${order.iName || order.oName}</strong>
<br>
<strong>THANK YOU FOR YOUR TRUST & WELCOME TO GEWINNER FAMILY.</strong>
<p style="text-align: left;">
Congratulations! Your pre-order is confirmed and you will be among the first to use MOOVOBRAIN V1.0<br>
We will keep you updated on the product launch, stay tuned for the BIG announcement.
<br><br>
Pre-order date: <strong>${order.createdAt.toDateString()}</strong> 
<br>
Sincerely.
<br><br>
<span style="color: #318CE7">
<strong>GEWINNER Team</strong>
<br>
Smart Tunisian Technoparks, Ariana, Tunisia
<br>
+21650503198 / +21626772923
<br>

contact@gewinner.tn 
<br>
www.gewinner.tn
</span>
</p>
`,
    };
    return mailer.send(email);
}

const createdAt = new Date();
send({iEmail : 'ahmed.michrgui@hotmail.fr' , name : 'Ahmed' , createdAt }).then(() => {
    console.log('email sent');
}).catch((error) => {
    console.log(error);
});

module.exports = {send};
