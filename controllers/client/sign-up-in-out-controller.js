const Client = require('../../models/client-model');
const ClientID = require('../../models/clientID-model');

// Sign up a new Client { client info => client info ,token }
const signUp = async function (req, res) {
    let client;
    client = new Client(req.body);
    try {
        const token = await client.generateAuthToken();
        client.tokens.push({token});
        // we check here if the client ID provided is added in our database by the admin
        const isExistingClientID = await ClientID.findOne({clientID : client.clientID});
        if (isExistingClientID) {
            await client.save();
            res.status(201).send({client,token});
        }else {
            throw new Error('client id does not exist');
        }
    } catch (error) {
        res.status(400).send({error: error.toString()});
    }
};

// Sign in a client  { email,password => client info,token }
const signIn = async function (req, res) {
    try {
        const client = await Client.findByCredentials(req.body.email, req.body.password);
        if (client.isBanned) {
            throw new Error('This account has been banned')
        }
        const token = await client.generateAuthToken();
        client.tokens.push({token});
        await client.updateOne({tokens: client.tokens});
        res.status(200).send({client, token});
    } catch (error) {
        console.log(error)
        res.status(400).send({error: error.toString().replace('Error: ', '')});
    }
};

// Sign out a client  { client,authToken => none }
const signOut =  async function (req, res) {
    try {
        let clientTokens = req.client.tokens;
        clientTokens = clientTokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.client.updateOne({tokens: clientTokens});
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {signUp,signIn,signOut}
