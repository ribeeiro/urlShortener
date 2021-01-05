const express= require('express');
const router = express.Router();


// models
const Urls = require('./Urls');

//midlewares
const validateMiddleware = require('../middlewares/validateUrl');

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

router.post('/scripts/shortenUrl', validateMiddleware, async (req, res)=>{
    const long = req.body.long;
    function genpath(){
        let short = Math.floor(Math.random() * (800000 - 100000)) + 1000000;
        short = short.toString(36)
        return short
    }

    let short = genpath();
    let exists = await Urls.findOne({where: {short_path: short}})
    while (exists){
        short = genpath();
        exists = await Urls.findOne({where: {short_path: short}})
    }
    try{
        await Urls.create({
            long_uri: long,
            short_path: short
        })
        const domain = '127.0.0.1'
        req.session.message = `${domain}/${short}`;
        res.redirect('/');
    }
    catch(err){
        res.redirect('/');
    }

})

module.exports = router;