const multer = require('multer');

const Accessorie = require('../../models/accessorie-model');
const AccessorieOrder = require('../../models/accessorie-order-model');

const fileStorage = multer.diskStorage({
    destination: ((req, file, callback) => {
        callback(null, 'public/images/accessories');
    }),
    filename(req, file, callback) {
        callback(null, new Date().getTime() + '_' + file.originalname);
    }
})
const uploadImage = multer({
    storage: fileStorage,
    limits: {fileSize: 10000000},
    fileFilter(req, file, callback) {
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|webp)/)) {
            return callback(new Error('File must be an image'));
        }
        return callback(null, true);
    }
});

// Add accessorie  { admin,authToken,accessorie => none }
const addAccessorie = async function (req, res) {
    try {
        const imageURL = [];
        req.files.forEach(file => {
            console.log("before : "+file.path);
            imageURL.push(file.path.replace('public\\', '/'));
            console.log("after : "+file.path.replace('public\\', '\\'));
        });
        if (req.body.availableQuantity == 'null'){
            req.body.availableQuantity = Infinity;
        }
        const accessorie = new Accessorie({...req.body, imageURL});
        await accessorie.save();
        res.status(200).send(accessorie);
    } catch (error) {
        res.status(400).send({error: error.toString()});
    }
};

// This function will catch the errors thrown by uploadImage() function , it must have 4 parameters
const addAccessorieErrorCatcher = function (error, req, res, next) {
    res.status(400).send({error: error.message});
};

// Get accessorie  { accessorie's id => accessorie }
const getOneAccessorie = async function (req, res) {
    try {
        const accessorie = await Accessorie.findById(req.params.id);
        if (!accessorie) {
            return res.status(404).send();
        }
        res.status(200).send(accessorie);
    } catch (error) {
        res.status(400).send();
    }
};


// Get all accessories  { none => accessories }
const getAllAccessories = async function (req, res) {
    try {
        const accessories = await Accessorie.find().sort({createdAt: 'asc'});

        for (const accessorie of accessories) {

            // update last month orders
            const dateLastMonth = new Date(new Date().getTime() - (30 * 24 * 3600000));
            accessorie.ordersThisMonth = await AccessorieOrder.countDocuments({
                accessorieID: accessorie._id,
                "createdAt": {"$gte": dateLastMonth}
            });
        }
        res.status(200).send(accessories);
    } catch (error) {
        res.status(500).send();
    }
};

// Update accessorie  { admin,authToken,accessorie's ID , update body => updated accessorie }
const updateAccessorie = async function (req, res) {
    const imageURL = [];
    const updatesAllowed = ['name', 'description', 'price', 'isAvailable',
        'availableQuantity', 'totalOrders', 'ordersThisMonth', 'imageURL'];
    const updatesRequested = Object.keys(req.body);
    const isValidUpdate = updatesRequested.every((update) => {
        return updatesAllowed.includes(update);
    });
    if (!isValidUpdate) {
        return res.status(400).send({error: 'update not valid'});
    }
    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            imageURL.push(file.path.replace('public\\', '/'));
        });
        req.body.imageURL = imageURL;
    }
    try {
        const updatedAccessorie = await Accessorie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        updatedAccessorie ? res.status(200).send(updatedAccessorie) : res.status(404).send();
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete accessorie  { admin,authToken,accessorie's ID => none }
const deleteAccessorie = async function (req, res) {
    try {
        const deletedAccessorie = await Accessorie.findByIdAndDelete(req.params.id);
        deletedAccessorie ? res.status(200).send() : res.status(404).send();
    } catch (error) {
        res.status(400).send();
    }
}

/* =============================
    Manage accessories Orders
   =============================*/

// add accessorie-order {admin , authToken , accessorie-order => none }
const addAccessorieOrder = async function (req, res) {
    try {
        const order = new AccessorieOrder(req.body);
        const quantity = order.quantity;
        await Accessorie.findOneAndUpdate({_id: order.accessorieID}, {
            $inc: {'totalOrders': quantity},
            $inc: {'availableQuantity': -quantity}
        }).exec();
        await order.save();
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
}

// Get all accessories orders {admin , authToken => accessories orders }
const getAllAccessoriesOrders = async function (req, res) {
    try {
        const orders = await AccessorieOrder.find().sort({createdAt: 'asc'});
        res.status(200).send(orders);
    } catch (e) {
        res.status(400).send(e);
    }
}

// Get all accessories orders {admin , authToken , accessorie's ID => none }
const deleteAccessorieOrder = async function (req, res) {
    try {
        const deletedOrder = await AccessorieOrder.findByIdAndRemove(req.params.id);
        const status = deletedOrder ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}

const changeOrderStatus = async function (req, res) {
    try {
        const updatedOrder = await AccessorieOrder.findByIdAndUpdate(req.params.id, {status: req.body.status});
        const status = updatedOrder ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}


module.exports = {
    uploadImage,
    addAccessorie,
    addAccessorieErrorCatcher,
    getOneAccessorie,
    getAllAccessories,
    deleteAccessorie,
    updateAccessorie,
    addAccessorieOrder,
    getAllAccessoriesOrders,
    deleteAccessorieOrder,
    changeOrderStatus
}
