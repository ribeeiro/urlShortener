const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

//config db
const connection = require('./database/db');

connection.authenticate().then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
})

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.static('public'));
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



const PORT = process.env.PORT || 3500;

app.listen(PORT, (err)=>{
    console.log(`server running at http://127.0.0.1:${PORT}`);
})