const axios = require('axios');
const cheerio = require('cheerio');

const validator = require('validator');

exports.getTitle = async (req, res, next)=>{
    const long = req.body.long;
    axios({method: 'GET', url: long}).then(response =>{
        const html = response.data;
        const $ = cheerio.load(html);
        req.title = $('title').text();
        next();
    })
}

exports.setCookie = async (req, res, next) => {
    var short = req.short

    if(!req.cookies.userpaths){
        res.cookie('userpaths', short);
        next();
    }else{
        let paths = req.cookies.userpaths.split(',');
        if(paths.length === 5){
            paths.shift();
            paths.push(short);
            res.cookie('userpaths', paths.join(','));
            next();
        }else{
            paths.push(short);
            res.cookie('userpaths', paths.join(','));
            next();
        }
    }
}

exports.shortenUrl = async (req,res, next) =>{
    const MAX_VALUE = 800000;
    const MIN_VALUE = 100000;
    let short = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;
    short = short.toString(36);
    req.short = `${req.headers.host}/${short}`;
    next();
}

exports.validateUrl = async (req, res, next) => {
    const long = req.body.long;
    if(validator.isURL(long)){
        if(validator.isURL(long, {require_protocol: true})){
            next();
        }else{
            req.body.long = `http://${long}`;
            next();
        }
    }else{
        req.flash('message', 'O link esta incorreto');
        res.redirect('/');
    }
}