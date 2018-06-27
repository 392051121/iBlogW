var db = require('../dbmanager/db');
var catalogModel = require('../model/catalogModel').catalogModel;
var dateFormat = require('../utils/dateFormat');

var findOne = function(name, callback) {
	catalogModel.find({
		'catalog': name
	}, function(err, data) {
		if(err) {
			return callback(err);
		} else {
			return callback(null, data);
		}
	});
}
var findOneById = function(id, callback) {
    catalogModel.find({
        '_id': id
    }, function(err, data) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}
var findAll = function(callback) {
    catalogModel.find( function(err, data) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}
var findByPage = function(page,name,callback) {
	var dataOjb = {
		count: '',
		catalogList: ''
	};
	if(name !== ""){
		name = {"catalog":name};
	}else{
		name = {};
	}
	catalogModel.count(name,function(err, count) {
		if(err) {
			return callback(err);
		} else {
			if(count !== 0 && count !== "0" && count !== "") {
				dataOjb.count = count;
				catalogModel.find(name).skip((page - 1) * 5).limit(5).exec(function(err, doc) {
					if(err) {
						return callback(err);
					} else {
						dataOjb.catalogList = doc;
						return callback("", dataOjb);
					}
				});
			} else {
				return callback("", dataOjb);
			}
		}
	});

}
var insertUser = function(name,callback){
	var today = dateFormat.format(new Date(),"YYYYMMDD");
	//today = today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDay().toString();
	var catalog = {
		catalog:name,
		CreateTime:today,
		ModifyTime:today
	};
	catalogModel.create(catalog,function(err,users){
		if(err){
			return callback(err);
		}else {
			return callback("","success");
		}
	});
}
var update = function(id,name,callback){
	catalogModel.update({"_id":id},{$set:{"catalog":name}},function(err,data){
		if(err){
			return callback(err);
		}else{
			findOneById(id,callback);
		}
	});
}
var deleteOne = function(id,callback){
	catalogModel.deleteOne({"_id":id},function(err){
		if(err){
			callback(err);
		}else{
			callback("");
		}
	});
}
exports.findOne = findOne;
exports.findByPage = findByPage;
exports.insertUser = insertUser;
exports.update = update;
exports.deleteOne = deleteOne;
exports.findAll = findAll;