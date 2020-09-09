const Client = require('../../models/client-model');
const ClientID = require('../../models/clientID-model');
const servicesController = require('../client/manage-services-controller');

// Ban a client  { admin,authToken,banned client email => none }
const banClient = async function (req, res) {
    try {
        const client =await Client.findOneAndUpdate({email : req.body.email},{isBanned : true,tokens:[]});
        const status = client ? 200 : 404;
        res.status(status).send();
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

const getAllClients = async function(req,res){
    try{
        const clients = await Client.find();
    // we fetch the next quality control for every client here before we return it
        for (let i=0;i<clients.length;i++){
            const schedulesArray = await servicesController.getQualityControls(clients[i]);
            clients[i].nextSchedule = schedulesArray.length>0 ? schedulesArray[0].schedule : null;
        }
        res.status(200).send(clients);
    }catch (e) {
        res.status(500).send();
    }
}

module.exports = {banClient , addClientID , getAllClients};
