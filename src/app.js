const express = require('express');
const app = express();

const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

//config db
const connection = require('../database/db');

connection.authenticate().then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.use(flash())

app.use('/', require('./routes/urls'));

module.exports = app;