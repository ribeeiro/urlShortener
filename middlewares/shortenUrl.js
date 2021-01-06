function shortUrl(req,res, next){
    const MAX_VALUE = 800000;
    const MIN_VALUE = 100000;
    let short = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;
    short = short.toString(36);
    res.locals.short = `${req.headers.host}/${short}`;
    next();
}

module.exports = shortUrl;