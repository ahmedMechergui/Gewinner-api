const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./database/mongoose');
const clientRouter = require('./routes/client-router');
const adminRouter = require('./routes/admin-router');
const visitorRouter = require('./routes/visitor-router');

const port = process.env.PORT || 3000;
const app = express();
app.use(logger('dev'));

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

app.listen(port);
