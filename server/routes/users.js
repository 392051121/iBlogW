var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
var check = require('./checkRoute');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req, res, next){
	 var username = req.body.username;
	 var password = req.body.password;
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
	     	   if(password === data[0].Password){
	     	   	  var user = {'username':username,'password':password};
	     	   	  req.session.user = user;
	     	      res.end('{"success":"true"}');
	     	   }
	     }
	 })
});

router.post('/userList',function(req,res,next){
	if (!req.session.user) {
		res.end('{"success":"err"}');
	}else if (req.session.user) {
		next();
	}
});

router.post('/userList',function(req, res, next){
	var page = req.body.page;
	var name = req.body.username;
	userService.findByPage(page,name,function(err,data){
		if(err){
			res.end('{"err":err}');
		}
		if(data.userList.length !== 0){
			var obj = {
				userList:data.userList,
				count:data.count,
				success:"true"
			};
			var str = JSON.stringify(obj);
      res.end(str);
		}
	});
});
router.post('/add',function(req, res, next){
	var name = req.body.username;
	var password = req.body.password;
	userService.insertUser(name,password,function(err,data){
		if(err){
			res.end('{"err":err}');
		}else if(data === "success"){
			res.end('{"success":"添加成功"}');
		}
	});
});
router.post('/search',function(req,res,next){
	 var username = req.body.username;
	 var password = req.body.password;
	 if(username === ""){
	 	   res.end('{"err":"用户名为空"}');
	 }
	 userService.findOne(username,function(err,data){
	     if(err){
	         res.end('{"error":err}');
	     }else{
	     	   if(data.length === 0){
	     	   	   res.end('{"error":"没有此用户"}');
	     	   }
	     	   data = JSON.stringify(data);
	     	   res.end(data);
	     }
	 });
});
router.post('/update',function(req,res,next){
	 var id = req.body.id;
	 var username = req.body.username;
	 var password = req.body.password;
	 if(username === ""){
	 	   res.end('{"err":"用户名为空"}');
	 }
	 userService.update(id,username,password,function(err,data){
	     if(err){
	         res.end('{"error":err}');
	     }else{
	     	   data = JSON.stringify(data);
	     	   console.log(data);
	     	   res.end(data);
	     }
	 });
});
router.post('/delete',function(req,res,next){
	var id = req.body.id;
	console.log(id);
	userService.deleteOne(id,function(err){
		if(err){
			res.end('{"error":err}');
		}else{
			res.end('{"success":"删除成功"}');
		}
	});
});
module.exports = router;
