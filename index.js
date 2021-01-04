const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const Urls = require('./url/Urls');

const urlsController = require('./url/urlController');

const connection = require('./config/db');

connection.authenticate().then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
})

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', urlsController)

app.get('/', (req, res)=>{
    const ola = 'ola'
    res.render('index', {ola});
})

const PORT = process.env.PORT || 3500;

app.listen(PORT, (err)=>{
    console.log(`server running at http://127.0.0.1:${PORT}`);
})