const express= require('express');
const router = express.Router();


// models
const Urls = require('./Urls');

//midlewares
const validateMiddleware = require('../middlewares/validateUrl');
const shortenMiddleware = require('../middlewares/shortenUrl');
const setcookieMiddleware = require('../middlewares/setCookie');

router.get('/:path', async (req, res)=>{
    const url_path = req.params.path;
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

router.post('/scripts/shortenUrl', validateMiddleware, shortenMiddleware, setcookieMiddleware, async (req, res)=>{
    const long = req.body.long;
    const short = res.locals.short;
    const paths = req.cookies.userpaths.split(',');
    try{
        await Urls.create({
            long_uri: long,
            short_path: short
        })
        const domain = process.env.HOST;
        req.session.message = `${domain}/${short}`;
        res.redirect('/');
    }
    catch(err){
        res.redirect('/');
    }

})

module.exports = router;