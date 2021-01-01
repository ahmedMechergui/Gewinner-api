const Order = require('../../models/order-model');
const multer = require('multer');
const emailSender = require('../../emails/moovobrain-orders-email');
const emailSenderBrainMode = require('../../emails/moovobrain-brain-preorder-email');

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
        const order = await Order.findByIdAndUpdate(req.body.id, {
            paymentSlipURL: '/payment/moovobrain/' + req.file.filename,
            status: 'pending'
        });
        const status = order ? 200 : 404;

        res.status(status).send();
    } catch (error) {
        res.status(400).send();
    }
};

// Order moovobrain { order body => order saved and waiting for admin validation }
const addMoovobrainOrder = async function (req, res) {
    const order = new Order(req.body);
    try {
        await order.save();

        /*
            for now emails are sent once the user pre-orders from the website since there
            is no actual product to make orders

            if you are about to make orders , their code and email already written,implemented
             and ready to be used , and the payment system is fully implemented is the three
             projects (gewinner website , dashboard , API) since the payment was used before
             we go with the pre-order instead of orders
         */
        await emailSenderBrainMode.send(order);


        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {addMoovobrainOrder, upload, uploadErrorCatcher, attachPaymentSlip, getOneOrder};
