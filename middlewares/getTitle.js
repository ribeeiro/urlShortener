const axios = require('axios');
const cheerio = require('cheerio');

function getUrlTitle(req, res, next){
    const long = req.body.long;
    axios({method: 'GET', url: long}).then(response =>{
        const html = response.data;
        const $ = cheerio.load(html);
        res.locals.title = $('title').text();
        next();
    })
}

module.exports = getUrlTitle;