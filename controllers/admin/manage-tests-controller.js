const Test = require('../../models/test-model');

// Validate test  { admin,authToken,test ID => none }
const validateTest = async function (req, res) {
    try {
        const testID = req.params.id;
        const test = await Test.findById(testID);
        if (!test) {
            return res.status(404).send()
        }
        await test.update({isValidated: true});
        // send email to the tester
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
};

const getAllTests = async function (req, res) {
    try {
        const tests = await Test.find({}).sort({createdAt: 'asc'});
        res.status(200).send(tests);
    } catch (e) {
        res.status(400).send();
    }
}

const updateTest = async function (req, res) {
    // check if the updates are valid
    const allowedUpdates = ['status', 'scheduledDate'];
    const requestedUpdates = Object.keys(req.body);
    const isValidUpdates = requestedUpdates.every(requestedUpdate => {
        return allowedUpdates.includes(requestedUpdate);
    });
    if (!isValidUpdates) {
        return res.status(400).send();
    }
    try {
        const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body);
        const status = updatedTest ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(500).send();
    }
}

const deleteTest = async function (req, res) {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);
        const status = deletedTest ? 200 : 404;
        res.status(status).send();
    } catch (e) {
        res.status(400).send();
    }
}

module.exports = {validateTest, getAllTests, updateTest , deleteTest};
