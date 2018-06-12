var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req, res, next){
	 var username = req.body.username;
	 var password = req.body.pass;
	 if(username === ""){
	 	   res.end('{"err":"用户名为空"}');
	 }
	 userService.findOne(username,function(err,data){
	     if(err){
	         res.end('{"err":err}');
	     }else{
	     	   if(data.length === 0){
	     	   	   res.end('{"err":"没有此用户"}');
	     	   }
	     	   if(password === data.Password){
	     	       res.end('{"success":"true"}');
	     	   }
	     }
	 })
});
module.exports = router;
