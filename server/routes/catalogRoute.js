var express = require('express');
var router = express.Router();
var catalogService = require('../service/catalogService');
var check = require('./checkRoute');


router.post('/catalogList',function(req,res,next){
	if (!req.session.user) {
		res.end('{"success":"err"}');
	}else if (req.session.user) {
		next();
	}
});

router.post('/catalogList',function(req, res, next){
	var page = req.body.page;
	var name = req.body.catalog;
	catalogService.findByPage(page,name,function(err,data){
		if(err){
			res.end('{"err":err}');
		}
		if(data.catalogList.length !== 0){
			var obj = {
				catalogList:data.catalogList,
				count:data.count,
				success:"true"
			};
			var str = JSON.stringify(obj);
      res.end(str);
		}
	});
});
router.post('/catalogAll',function(req, res, next){
    catalogService.findAll(function(err,data){
        if(err){
            res.end('{"err":err}');
        }
        if(data.length !== 0){
            var obj = {
                catalogList:data,
                success:"true"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        }
    });
});
router.post('/add',function(req, res, next){
	var name = req.body.catalog;
	catalogService.insertUser(name,function(err,data){
		if(err){
			res.end('{"err":err}');
		}else if(data === "success"){
			res.end('{"success":"添加成功"}');
		}
	});
});
router.post('/search',function(req,res,next){
	 var name = req.body.name;
	 if(name === ""){
	 	   res.end('{"err":"目录名为空"}');
	 }
	 catalogService.findOne(name,function(err,data){
	     if(err){
	         res.end('{"error":err}');
	     }else{
	     	   if(data.length === 0){
	     	   	   res.end('{"error":"没有此目录"}');
	     	   }
	     	   data = JSON.stringify(data);
	     	   res.end(data);
	     }
	 });
});
router.post('/update',function(req,res,next){
	 var id = req.body.id;
	 var name = req.body.catalog;
	 if(name === "" || name === null){
	 	   res.end('{"err":"目录名为空"}');
	 }
	 catalogService.update(id,name,function(err,data){
	     if(err){
	         res.end('{"error":err}');
	     }else{
	     	   data = JSON.stringify(data);
	     	   res.end(data);
	     }
	 });
});
router.post('/delete',function(req,res,next){
	var id = req.body.id;
	catalogService.deleteOne(id,function(err){
		if(err){
			res.end('{"error":err}');
		}else{
			res.end('{"success":"删除成功"}');
		}
	});
});
module.exports = router;
