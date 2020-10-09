const Order = require('../../models/order-model');

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

const deleteOrder = async function (req, res) {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        const status = deletedOrder ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}

module.exports = {getAllOrders, updateOrderStatus, deleteOrder}
