const http = require("http");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
let handlebars  = require('express-handlebars');
const csrf = require("csurf");
const moment = require("moment");

const config = require("./utils/config");

const errorController = require("./controllers/error");
const currentTrains = require("./routes/main/current_trains");
const books = require("./routes/main/books");
const history = require("./routes/main/history");
const settings = require("./routes/main/settings");
const support = require("./routes/main/support");
const login = require("./routes/main/login");
const email = require("./routes/main/email");

const usersApi = require("./routes/api/users");

const app = express();
const store = MongoDBStore({
    uri: config.MONGODB_URI,
    collections: "sessions"
});

const csrfProtection = csrf();

app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', handlebars({ // Функции для теплейтов
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', "layouts"),
    defaultLayout: 'base',  
    helpers: {
        objectLength: (obj) => {
            if(obj){
                return Object.keys(obj).length;
            }
            return 0;
        },
        stringify: (obj) => {
            if(obj){
                return JSON.stringify(obj);
            }
            return '';
        },
        checkedState: (state) => {
            if(state === 'true' || state === true){
                return 'checked';
            }
            return '';
        },
        selectState: (state, value) => {
            if(state === value){
                return 'selected';
            }
            return '';
        },
        isNull: (value, options) => {
            if(typeof value === 'undefined' || value === ''){
                return options.fn(this);
            }
            return options.inverse(this);
        },
        toLower: (value) => {
            if(value){
                return value.toLowerCase();
            }
            return null;
        },
        formatDate: (date, format) => {
            return moment(date).format(format);
            //return new Date(date).toString(format);
        },
        contains: (values, value, options) => {
            if(values.includes(value)){
                return options.fn(this);
            }
            return options.inverse(this);
        },
       
    }  
}));
app.set('view engine', 'hbs');


app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { // Настройка CORS для апишки
    const allowedOrigins = ['https://qfit.kz', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(session({ // Настройка сессии
    secret: "test", // Потом поставить норм строку
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use(csrfProtection); // csrf защита

app.use((req, res, next) => {
    req.handlebars = handlebars;
    next();
});

app.use(function(req, res, next) { // Ограничение доступа к админке
    if (req.session.current_user == null && req.path !== "/admin-panel/login" && req.path !== "/admin-panel/register"){
        res.redirect('/admin-panel/login');
    }else if(req.session.current_user != null && req.path === "/admin-panel/login"){
        res.redirect("/admin-panel/");
    }else if(req.path === "/"){
        res.redirect("/admin-panel/");
    }
    else{
        next();
    }
});

app.use((req, res, next) => { // Передача в каждый запрос сессии и csrf
    res.locals.current_user = req.session.current_user;
    res.locals.current_company = req.session.current_company;
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Main urls
app.use("/admin-panel", currentTrains);
app.use("/admin-panel", books);
app.use("/admin-panel", settings);
app.use("/admin-panel", support);
app.use("/admin-panel", history);
app.use("/admin-panel", login);
app.use("/admin-panel", email);

// Api urls
app.use("/api", usersApi);

// Not found
app.use(errorController.get404);

// MongoDB connect
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true}).then(result  => {
    app.listen(3000);
}).catch(err => {
    console.log(err);    
});
