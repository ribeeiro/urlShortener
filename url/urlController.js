const express= require('express');
const router = express.Router();

const Urls = require('./Urls');

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
    const short = Math.floor(Math.random() * (800000 - 100000)) + 1000000;
    try{
        await Urls.create({
            long_uri: long,
            short_path: short.toString(36)
        })
        res.send('oi');
    }
    catch{
        res.redirect('/')
    }

})

module.exports = router;