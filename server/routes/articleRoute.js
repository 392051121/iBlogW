var express = require('express');
var router = express.Router();
var articleService = require('../service/articleService');
var check = require('./checkRoute');

router.post('/createArticle',function(req,res,next){
    if (!req.session.user) {
        res.end('{"success":"err"}');
    }else if (req.session.user) {
        res.end('{"success":"success"}');
    }
});
router.post('/saveArticle',function(req,res,next){
    var title = req.body.title;
    var catalog = req.body.catalog;
    var article = req.body.article;
    articleService.insertArticle(title,catalog,article,function(err,data){
    	if(err){
    		res.end('{"err":err}');
    	}else if(data === 'success'){
    		res.end('{"success":"添加成功"}');
    	}else{
    		res.end('{"success":"添加失败"}');
    	}
    });
});
router.post('/articleList',function(req, res, next){
	var page = req.body.page;
	var name = req.body.article;
	articleService.findByPage(page,name,function(err,data){
		if(err){
			res.end('{"err":err}');
		}
		if(data.articleList.length !== 0){
			var obj = {
				articleList:data.articleList,
				count:data.count,
				success:"true"
			};
			var str = JSON.stringify(obj);
      res.end(str);
		}
	});
});
module.exports = router;