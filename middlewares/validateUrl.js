async function urlValidator(req, res, next){
    const long = req.body.long;
    if(!long || !long.match(/.*\..*/)){
        res.redirect('/');
    }else{

        //checking if the person typed http:// or https:// before url or the url starts with a special character
        if(long.match(/^(http(s)?):\/\//)){
            next();
        }else if(long.match(/:/)){
            //TODO RETURN INVALID LINK SOMEHOW
            console.log('invalid')
            res.redirect('/')
        }else if(!long.match(/^[a-z0-9]/i)){
            //TODO RETURN INVALID LINK SOMEHOW
            console.log('invalid')
            res.redirect('/')
        }else{
            req.body.long = `http://` + long
            console.log(req.body.long)
            next();
        }
    }
}

module.exports = urlValidator;