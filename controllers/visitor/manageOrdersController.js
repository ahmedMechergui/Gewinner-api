const Order = require('../../models/order-model');
const multer = require('multer');
const emailSender = require('../../emails/moovobrain-orders-email');

const fileStorage = multer.diskStorage({
    destination: ((req, file, callback) => {
        callback(null, 'public/payment/moovobrain');
    }),
    filename(req, file, callback) {
        callback(null, new Date().getTime() + '_' + file.originalname);
    }
})

const upload = multer({
    storage: fileStorage,
    limits: {fileSize: 10000000}
});

const uploadErrorCatcher = function (error, req, res, next) {
    res.status(400).send({error: error.message});
};

// get One order {id => moovobrain order}
const getOneOrder = async function (req, res) {
    try {
        const order = await Order.findById(req.body.id);
        if (order) {
            return res.status(200).send(order);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.send(400).send();
    }
}


// Attach payment slip  { payment slip ( can be in any format ) , order ID => none }
const attachPaymentSlip = async function (req, res) {
    try {
        const order = await Order.findByIdAndUpdate(req.body.id, {paymentSlipURL: '/payment/moovobrain/' + req.file.filename ,status : 'pending'});
        const status = order ? 200 : 404;
        res.status(status).send();
    } catch (error) {
        res.status(400).send();
    }
};

// Order moovobrain { order body => confirmation email sent }
const addMoovobrainOrder = async function (req, res) {
    const order = new Order(req.body);
    try {
        await order.save();
        // sending confirmation email
        await emailSender.send(order);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

module.exports = {addMoovobrainOrder, upload, uploadErrorCatcher, attachPaymentSlip, getOneOrder};
