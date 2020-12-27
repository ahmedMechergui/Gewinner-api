const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

require('./emails/moovobrain-orders-email');

require('./info');
require('./database/mongoose');
const clientRouter = require('./routes/client-router');
const adminRouter = require('./routes/admin-router');
const visitorRouter = require('./routes/visitor-router');
const PORT = process.env.PORT || 443;
const app = express();
app.use(logger('dev'));
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/accessories', express.static(path.join(__dirname, 'public/images/accessories')));
app.use('/images/articles', express.static(path.join(__dirname, 'public/images/articles')));
app.use('/join-us/cv', express.static(path.join(__dirname, 'public/join-us-cv')));



app.use(clientRouter);
app.use(adminRouter);
app.use(visitorRouter);

// app.listen(PORT);

/* ===============================
 # SSL configuration
   ===============================*/

const sslOptions = {

    key: fs.readFileSync('ssl-certif/private.key'),
    cert: fs.readFileSync('ssl-certif/certificate.crt'),

    ca: [
        fs.readFileSync('ssl-certif/ca_bundle.crt')
    ]
};


const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(+PORT);
