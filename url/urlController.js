const express= require('express');
const router = express.Router();


// models
const Urls = require('./Urls');

//midlewares
const validateMiddleware = require('../middlewares/validateUrl');
const shortenMiddleware = require('../middlewares/shortenUrl');
const setCookieMiddleware = require('../middlewares/setCookie');
const getTitleMiddleware = require('../middlewares/getTitle');

router.get('/:path', async (req, res)=>{
    const url_path = `${req.headers.host}/${req.params.path}`;
    try{
        const url = await Urls.findOne(
            {
                where:{
                    short_path: url_path
                }
            })
        res.redirect(`${url.long_uri}`);
    }
    catch{
        res.redirect('/');
    }
})


router.post('/scripts/shortenUrl', validateMiddleware, shortenMiddleware, setCookieMiddleware, getTitleMiddleware, 
async (req, res)=>{
    try{
        const long = req.body.long;
        const short = res.locals.short;
        const title = res.locals.title;
        await Urls.create({
            long_uri: long,
            short_path: short,
            title
        })
        // change the value for the url shortened
        req.session.message = `${short}`;
        res.redirect('/');
    }
    catch(err){
        res.redirect('/');
    }
    
    
})

module.exports = router;