function setCookies(req, res, next){
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
module.exports = setCookies;