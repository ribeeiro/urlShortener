function setCookies(req, res, next){
    if(!req.cookies.userpaths){
        res.cookie('userpaths', res.locals.short);
        next();
    }else{
        let paths = req.cookies.userpaths.split(',');
        if(paths.length === 5){
            paths.shift();
            paths.push(res.locals.short);
            res.cookie('userpaths', paths.join(','));
            next();
        }else{
            paths.push(res.locals.short);
            res.cookie('userpaths', paths.join(','));
            next();
        }
    }
    
}
module.exports = setCookies;