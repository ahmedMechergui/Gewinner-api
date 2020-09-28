const Order = require('../../models/order-model');
const emailSender = require('../../emails/moovobrain-orders-email');

// Order moovobrain { order body => confirmation email sent }
const addMoovobrainOrder = async function(req,res){
    const order = new Order(req.body);
    try{
        await order.save();
        // sending confirmation email
        await emailSender.send(order);
        res.status(200).send();
    }catch (error) {
        res.status(400).send();
    }
}

module.exports = {addMoovobrainOrder};
