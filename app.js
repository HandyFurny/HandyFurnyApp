
//const config = require ("./config")
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");

//Aqui declaramos las rutas para ser utilizadas más abajo
const index        = require ("./routes/index.js")
const authRoutes   = require ("./routes/auth.js")
const item         = require('./routes/item.js');
const profile      = require ("./routes/profile.js")
const chat         = require ("./routes/chat.js")

mongoose.connect('mongodb://localhost/handyfurniture')
  .then(console.log(`connected!!`));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Handy Furny';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(flash());
//Requiero Bootstrap y Jquery de Node_Modules
app.use('/dist/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/dist/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


//session meddleware
app.use(session({
  secret: 'ironfundingdev',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection }) 
  //Si descomento las seciones aparecen en la base de datos
}));

//Tengo una carpeta de configuracion de PASSPORT
require ("./config/passport")(app)
// tengo una carpeta de configuracion de  SOCKETIO



//Usamos rutas
app.use('/', index)
app.use('/', authRoutes)
app.use('/user', profile)
app.use('/catalog', item)
app.use('/chat',chat);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;