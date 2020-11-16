const Order = require('../../models/order-model');
const emailSender = require('../../emails/moovobrain-orders-email');

// Get all orders  { admin,authToken => orders array }
const getAllOrders = async function (req, res) {
    try {
        const orders = await Order.find({}).sort({createdAt: 'asc'});
        res.status(200).send(orders);
    } catch (e) {
        res.status(500).send();
    }
}


// Update order status  { admin,authToken, order ID , {status} => none }
const updateOrderStatus = async function (req, res) {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {status: req.body.status});
        const status = updatedOrder ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}

// validate order  { admin,authToken, order ID , {priceShipping , priceTaxes} => none }
const validateOrder = async function (req, res) {
    try {
        const validatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            status: 'validated',
            priceShipping: req.body.priceShipping,
            priceTaxes: req.body.priceTaxes
        });
        const status = validatedOrder ? 200 : 404;
        if (status === 200) {
            validatedOrder.priceTotal = req.body.priceShipping + req.body.priceTaxes + validatedOrder.pricePurchase;
            await emailSender.send(validatedOrder);
            await validatedOrder.save();
        }
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}

const deleteOrder = async function (req, res) {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        const status = deletedOrder ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}

module.exports = {getAllOrders, updateOrderStatus, deleteOrder, validateOrder}
