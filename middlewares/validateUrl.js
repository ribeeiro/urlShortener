async function urlValidator(req, res, next){
    const long = req.body.long;
    if(!long || !long.match(/.*\..*/)){
        res.redirect('/');
    }else{
        //checking if the person typed http:// or https:// before url
        if(long.match(/^(http(s)?):\/\//)){
            next();
        }
        //Check if the url starts with a special character
        else if(!long.match(/^[a-z0-9]/i)){ //TODO make validations that return link incorrect
            next();
        }
    }
}

module.exports = urlValidator;