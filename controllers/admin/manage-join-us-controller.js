const path = require('path');

const Joiner = require('../../models/join-us-model');


// Get a cv PDF file  { admin,authToken, application id => cv pdf }
const getCvPdfFile = async function (req, res) {
    try {
        const joiner = await Joiner.findById(req.params.id);
        res.set('content-type', 'application/pdf');
        await res.sendFile(path.join(__dirname, '..', '..', 'public', joiner.cvURL));
    } catch (error) {
        console.log(error)
        res.status(500).send({error});
    }
};

// Get all join-us applications  { admin,authToken, application id => join-us application }
const getAllApplications = async (req, res) => {
    try {
        const joiners = await Joiner.find();
        res.status(200).send(joiners);
    } catch (error) {
        res.status(500).send();
    }
};

// Get a join-us application  { admin,authToken, application id => join-us application }
const getOneApplication = async function (req, res) {
    try {
        const joiner = await Joiner.findById(req.params.id);
        if (!joiner) {
            return res.status(404).send();
        }
        res.status(200).send(joiner);
    } catch (error) {
        res.status(400).send();
    }
};

// Update a join-us application {admin , authToken , application id , update body => none}
const updateApplication = async function (req, res) {
    // check if the updates requested are allowed
    const updatesAllowed = ['status', 'interviewDate'];
    const updatesRequested = Object.keys(req.body);
    const isValidUpdate = updatesRequested.every(request => {
        return updatesAllowed.includes(request);
    });

    if (!isValidUpdate) {
        return res.status(400).send();
    }

    // perform the update
    try {
        const updatedJoiner = await Joiner.findByIdAndUpdate(req.params.id, req.body, {new: true});
        updatedJoiner ? res.status(200).send() : res.status(404).send();
    } catch (e) {
        res.status(400).send();
    }

}

// Delete a join-us application {admin , authToken , application id => none}
const deleteApplication = async function (req, res) {
    try {
        const deleteApplication = await Joiner.findByIdAndDelete(req.params.id);
        deleteApplication ? res.status(200).send() : res.status(404).send();
    } catch (e) {
        res.status(400).send();
    }
}

module.exports = {getCvPdfFile, getAllApplications, getOneApplication, updateApplication , deleteApplication}
