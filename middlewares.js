const axios = require('axios');
const cheerio = require('cheerio');

exports.getTitle = async (req, res, next)=>{
    const long = req.body.long;
    axios({method: 'GET', url: long}).then(response =>{
        const html = response.data;
        const $ = cheerio.load(html);
        res.locals.title = $('title').text();
        next();
    })
}

exports.flashMessage = async (req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
}

exports.setCookie = async (req, res, next) => {
    var short = res.locals.short

    if(!req.cookies.userpaths){
        res.cookie('userpaths', short);
        res.locals.paths = short;
        next();
    }else{
        let paths = req.cookies.userpaths.split(',');
        if(paths.length === 5){
            paths.shift();
            paths.push(short);
            res.locals.paths = paths;
            res.cookie('userpaths', paths.join(','));
            next();
        }else{
            paths.push(short);
            res.locals.paths = paths;
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
    res.locals.short = `${req.headers.host}/${short}`;
    next();
}

exports.validateUrl = async (req, res, next) => {
    const long = req.body.long;
    // check if the log is null or the long doesnt have a dot between characters
    if(!long|| !long.match(/.*\..*/)){
        req.session.message = 'The provided link is incorrect';
        res.redirect('/');
    }else{
        //checking if the person typed http:// or https:// before url or the url starts with a special character
        if(long.match(/^(http(s)?):\/\/.*\..*/)){
            next();
        }else if(long.match(/:/) || !long.match(/^[a-z0-9]/i)){
            req.session.message = 'The provided link is incorrect';
            res.redirect('/');
        }else{
            req.body.long = `http://` + long
            next();
        }
    }
}