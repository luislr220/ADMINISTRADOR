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
const seccionH2Routes = require('./routes/seccionH2Routes');
const seccionH2CRoutes = require('./routes/seccionH2CRoutes');
const carouselHomeRoutes = require('./routes/carouselHomeRoutes');
const carouselC1Routes = require('./routes/carouselC1Routes');
const carouselC2Routes = require('./routes/carouselC2Routes');
const carouselAboutRoutes = require('./routes/carouselAboutRoutes');
const commentRoutes = require('./routes/commentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const servicesCardRoutes = require('./routes/servicesCardRoutes');
const innovationRoutes = require('./routes/innovationRoutes');
const lineaAboutRoutes = require('./routes/lineaAboutRoutes');

const app = express();
app.use(cors());



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
app.use('/comment',commentRoutes)
app.use('/event', eventRoutes);
app.use('/seccionH2', seccionH2Routes);
app.use('/seccionH2C', seccionH2CRoutes);
app.use('/carouselHome', carouselHomeRoutes);
app.use('/carouselAbout', carouselAboutRoutes);
app.use('/carouselC1', carouselC1Routes);
app.use('/carouselC2', carouselC2Routes);
app.use('/servicesCard', servicesCardRoutes);
app.use('/innovation', innovationRoutes);
app.use('/lineaAbout', lineaAboutRoutes);

module.exports = app;

