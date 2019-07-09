const   express = require('express'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        cookieParser = require('cookie-parser');
        flash = require('connect-flash');
        dotenv = require('dotenv').config(),
        mongoose = require('mongoose'),
        MongoStore = require('connect-mongo')(session);
        passport = require('passport'),
        strategyLogin = require('./config/passport.login'),
        strategySignup = require('./config/passport.signup'),
        app = express(),
        router = require('./routes/router');
    
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    maxAge: 24 * 60 * 60 * 1000,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);





app.listen(process.env.PORT);