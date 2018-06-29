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
var findByPage = function(page,name,callback) {
	var dataOjb = {
		count: '',
		articleList: ''
	};
	if(name !== ""){
		name = {"title":name};
	}else{
		name = {};
	}
	articleModel.count(name,function(err, count) {
		if(err) {
			return callback(err);
		} else {
			if(count !== 0 && count !== "0" && count !== "") {
				dataOjb.count = count;
				articleModel.find(name).skip((page - 1) * 5).limit(5).exec(function(err, doc) {
					if(err) {
						return callback(err);
					} else {
						dataOjb.articleList = doc;
						return callback("", dataOjb);
					}
				});
			} else {
				return callback("", dataOjb);
			}
		}
	});
}

exports.insertArticle = insertArticle;
exports.findByPage = findByPage;