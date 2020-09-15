const mongoose = require('mongoose');
// connecting to database
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database successfully');
}).catch(() => {
    console.log('ERROR : unable to connect to database');
});
