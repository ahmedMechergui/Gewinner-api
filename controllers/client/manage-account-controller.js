const bcrypt = require('bcrypt');
const Client = require('../../models/client-model');
const emailSender = require('../../emails/reset-password-email');
const mongoose = require('mongoose');

// Delete currently logged account  { client,authToken => none }
const deleteAccount = async function (req, res) {
    try {
        await req.client.remove();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
};

// Update currently logged account {client,authToken,updates => client}
const updateAccount = async function (req, res) {
    const updatesAllowed = ['name', 'email', 'password', 'oldPassword', 'phone'];
    const updatesRequested = Object.keys(req.body);
    const isValidUpdate = updatesRequested.every((update) => {
        return updatesAllowed.includes(update);
    });
    if (!isValidUpdate) {
        return res.status(400).send({error: 'invalid update'});
    }

    try {
        // if the password is updated , hash the new password and logout all other sessions by deleting their tokens
        // and preserving the current tokens
        if (req.body.password !== null) {
            // checks if the current password is matching the old password provided
            const isMatch = await bcrypt.compare(req.body.oldPassword, req.client.password);
            if (!isMatch) {
                return res.status(400).send({error: 'wrong password'});
            }
            req.body.password = await bcrypt.hash(req.body.password, 8);
            const currentTokenObject = req.client.tokens.find((token) => {
                return token.token === req.token
            });
            const tokens = [];
            tokens.push(currentTokenObject);
            req.body.tokens = tokens;
        } else {
            delete req.body.password;
            delete req.body.oldPassword;
        }
        await req.client.updateOne(req.body, {new: true, runValidators: true});
        const updatedClient = await Client.findById(req.client._id);
        res.status(200).send(updatedClient);
    } catch (error) {
        res.status(400).send({error: error.toString()});
    }
}

// when client writes his email and clicks send email , we send him an email { email address => reset email sent  }
const sendResetPasswordEmail = async function (req, res) {
    try {
        const client = await Client.findOne({email: req.body.email});
        if (!client) {
            return res.status(404).send()
        }
        client.resetPasswordID = mongoose.Types.ObjectId();
        await emailSender.send(client);
        client.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
}

// Generate a new password and send it to the client when he clicks the link in the reset email
// {resetPasswordID => new password}
const resetPassword = async function (req,res) {
    try{
        const newPassword = Math.random().toString(36).substring(5);
        const updatedClient = await Client.findOne({resetPasswordID : req.params.id});
        if (!updatedClient || updatedClient.resetPasswordID === null){return res.status(404).send()}
        const newPasswordHashed = await bcrypt.hash(newPassword, 8);
        updatedClient.resetPasswordID = null;
        await Client.findByIdAndUpdate(updatedClient._id,
            {password : newPasswordHashed,resetPasswordID : null},{new:true});
        res.status(200).send({newPassword});
    }catch (e) {
        res.status(400).send();
    }
}

module.exports = {deleteAccount, updateAccount, sendResetPasswordEmail , resetPassword};
