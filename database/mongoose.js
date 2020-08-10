const mongoose = require('mongoose');
const databaseURI =  'mongodb://127.0.0.1:27017/gewinner-api'
// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/gewinner-api', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database successfully');
}).catch(() => {
    console.log('ERROR : unable to connect to database');
});
