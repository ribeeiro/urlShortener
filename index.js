const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {Op} = require('sequelize');


//models
const Urls = require('./url/Urls');

//controllers
const urlsController = require('./url/urlController');

//config db
const connection = require('./config/db');

connection.authenticate().then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
})

app.set('view engine', 'ejs');


const flashMessage = require('./middlewares/flashMessage');
const setCookies = require('./middlewares/setCookie');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}))
app.use(cookieParser());
//routes
app.use('/', urlsController);

app.get('/',flashMessage, (req, res)=>{
    const pathCookie = req.cookies.userpaths
    if(pathCookie){
        let paths = pathCookie.split(',');

        Urls.findAll({
            where: {
                short_path: {
                    [Op.or]: paths}
            },
        order:[
            ['createdAt', 'DESC']
        ]})
        .then(path_data =>{
            res.render('index', {path_data});
        })
    }else{
        res.render('index', {path_data: null});
    }
})


const PORT = process.env.PORT || 3500;

app.listen(PORT, (err)=>{
    console.log(`server running at http://127.0.0.1:${PORT}`);
})