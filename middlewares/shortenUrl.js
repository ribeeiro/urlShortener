function shortUrl(req,res, next){
    let short = Math.floor(Math.random() * (800000 - 100000)) + 1000000;
    short = short.toString(36);
    res.locals.short = short;
    next();
}

module.exports = shortUrl;