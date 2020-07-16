const mongoose = require('mongoose');
const databaseURI = process.env.URI || 'mongodb://127.0.0.1:27017/gewinner-api'
// connecting to database
mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database successfully');
}).catch(() => {
    console.log('ERROR : unable to connect to database');
});
