var db = require('../dbmanager/db');
var userModle = require('../model/user').userModel;
var dateFormat = require('../utils/dateFormat');

var findOne = function(userName, callback) {
	userModle.find({
		'Username': userName
	}, function(err, data) {
		if(err) {
			return callback(err);
		} else {
			return callback(null, data);
		}
	});
}
var findOneById = function(id, callback) {
	userModle.find({
		'_id': id
	}, function(err, data) {
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
		userList: ''
	};
	if(name !== ""){
		name = {"Username":name};
	}else{
		name = {};
	}
	userModle.count(name,function(err, count) {
		if(err) {
			return callback(err);
		} else {
			if(count !== 0 && count !== "0" && count !== "") {
				dataOjb.count = count;
				userModle.find(name).skip((page - 1) * 5).limit(5).exec(function(err, doc) {
					if(err) {
						return callback(err);
					} else {
						dataOjb.userList = doc;
						return callback("", dataOjb);
					}
				});
			} else {
				return callback("", dataOjb);
			}
		}
	});

}
var insertUser = function(username,password,callback){
	var today = dateFormat.format(new Date(),"YYYYMMDD");
	//today = today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDay().toString();
	var user = {
		Username:username,
		Password:password,
		CreateTime:today,
		ModifyTime:today
	};
	userModle.create(user,function(err,users){
		if(err){
			return callback(err);
		}else {
			return callback("","success");
		}
	});
}
var update = function(id,name,password,callback){
	userModle.update({"_id":id},{$set:{"Username":name,"Password":password}},function(err,data){
		if(err){
			return callback(err);
		}else{
			findOneById(id,callback);
		}
	})
}
exports.findOne = findOne;
exports.findByPage = findByPage;
exports.insertUser = insertUser;
exports.update = update;