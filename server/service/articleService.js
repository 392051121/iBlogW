var db = require('../dbmanager/db');
var articleModel = require('../model/articleModel').articleModel;
var dateFormat = require('../utils/dateFormat');

var insertArticle = function(title,catalog,value,callback){
	var today = dateFormat.format(new Date(),"YYYYMMDD");
	var article = {
		title:title,
		catalog:catalog,
		status:'新建',
		article:value,
		CreateTime:today,
		ModifyTime:today
	};
	articleModel.create(article,function(err,data){
		if(err){
			return callback(err);
		}else {
			return callback("","success");
		}
	});
}


exports.insertArticle = insertArticle;