var express = require('express');
var router = express.Router();
var check = require('./checkRoute');

router.post('/createArticle',function(req,res,next){
    if (!req.session.user) {
        res.end('{"success":"err"}');
    }else if (req.session.user) {
        res.end('{"success":"success"}');
    }
});
module.exports = router;