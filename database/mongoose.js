const mongoose = require('mongoose');

// connecting to database
mongoose.connect('mongodb+srv://ahmed:9ar9ouch@gewinner.xsbnq.mongodb.net/gewinner?retryWrites=true&w=majority', {
// mongoose.connect('mongodb://127.0.0.1:27017/gewinner-api', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database successfully');
}).catch(() => {
    console.log('ERROR : unable to connect to database');
});
