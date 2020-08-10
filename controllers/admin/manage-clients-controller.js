const Client = require('../../models/client-model');
const ClientID = require('../../models/clientID-model');

// Ban a client  { admin,authToken,banned client ID => none }
const banClient = async function (req, res) {
    try {
        const bannedID = req.params.id;
        const client = await Client.findById(bannedID);
        if (!client) {
            return res.status(404).send()
        }
        await client.update({isBanned: true, tokens: []});
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
};

const addClientID = async function (req,res) {
    const clientID = new ClientID(req.body);
    try {
        await clientID.save();
        res.status(200).send();
    }catch(e){
        res.status(400).send();
    }
}

module.exports = {banClient , addClientID};
