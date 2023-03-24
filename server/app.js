const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');
var createError = require('http-errors');
const bodyParser = require('body-parser');

let dotenv = require('dotenv');
dotenv.config();

let mongo = require('./config/dbconfig');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRoutes = require('./routes/newsRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();



// Middleware
// Agregar las siguientes líneas para configurar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRoutes);
app.use('/event', eventRoutes);

module.exports = app;

