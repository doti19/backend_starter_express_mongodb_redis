const express = require('express');
const morgan = require('morgan');
// const compress = require('compression');
// const methodOverride = require('method-override');
const cors = require('cors');
// const helmet = require('helmet');
// const expressSession = require('express-session');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
// const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const routes = require('../api/routes/v1');
const {logs, } = require('./config');
// const strategies = require('./passport');

const {error} = require('../middlewares');
// const morganConfig = require('./morgan');
require('./logger');
// const {authLimiter} = require('./api/middlewares/rateLimiter');

// require('./passport')






const app = express();



// Middleware

app.use(morgan(logs));

//this is not needed
// app.use(morganMiddleware);

// if (server.env === 'production' || server.env === 'development') {
//  app.use(morganConfig.successHandler);
//  app.use(morganConfig.errorHandler);
// }

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// app.set("view engine", "ejs");

//serving static files
const staticFilesPath = path.join(__dirname, '..', '..', 'public');
app.use(express.static(staticFilesPath));

//sanitize request data
//app.use(xss());
//app.use(mongoSanitize());

//gzip compression
//app.use(compress());

//lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
// app.use(helmet());


//this is from another example for cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

//     next();
// });
// enable CORS - Cross Origin Resource Sharing
// app.use(cors());

// enable authentication
// app.use(expressSession({
//     secret: session.secret,
//     //TODO please check why i need to use resave and saveUninitialized
//     resave: true,
//     saveUninitialized: true,
//     rolling: true,
//     // maxAge: 20000,
//     // inorder to make this secure = true, the website should be https enabled
//     cookie: { secure: server.env === 'production', domain: 'localhost:3000' },
    

// }))


app.use(passport.initialize());
require('./passport')
//TODO is this needed?
// app.use(passport.session());


//limit repeated failed requests to auth endpoints
// if(env === 'production'){
//     app.use('/v1/auth', authLimiter);
// }


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//TODO only allow certain ips in here
app.use(cors());

// Routes
// Add your routes here
app.use('/', routes);
// app.all('*', (req, res) => {
//     nextTick(new Error(`${req.originalUrl} not found`, 404));
// });

// If error is not an instance of APIError, convert it.
app.use(error.converter);

// Catch 404 and forward to error handler
app.use(error.notFound);

// Error handler, send stacktrace only during development
app.use(error.handler);


module.exports = app;
