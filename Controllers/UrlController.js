// models
const Urls = require('../Models/Urls');
const {Op} = require('sequelize');

exports.redirectUrl = async (req, res) =>{
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
}

exports.shortenUrl = async (req, res)=>{
    try{
        const long = req.body.long;
        const short = req.short;
        const title = req.title;
        await Urls.create({
            long_uri: long,
            short_path: short,
            title
        })
        req.session.message = `${short}`;
        res.redirect('/');
    }
    catch(err){
        res.redirect('/');
    }   
}

exports.getUsersPaths = async (req, res) =>{
    const pathCookie = req.cookies.userpaths
    if(pathCookie){
        let paths = pathCookie.split(',');

        Urls.findAll({
            where: {
                short_path: {
                    [Op.or]: paths}
            },
        order:[
            ['createdAt', 'DESC']
        ]})
        .then(path_data =>{
            res.render('index', {path_data});
        })
    }else{
        res.render('index', {path_data: null});
    }
}