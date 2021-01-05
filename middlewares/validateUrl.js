async function urlValidator(req, res, next){
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

module.exports = urlValidator;