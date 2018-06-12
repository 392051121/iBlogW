var db = require('../dbmanager/db');
var userModle = require('../model/user').userModel;

var findOne = function(userName,callback){
	userModle.find({'Username':userName},function(err, data){
		if(err){
			console.log("22222222222222222");
			console.log(err);
			return callback(err);
		}else{
			console.log("3333333333333");
			console.log(data);
			return callback(null,data);
		}
	});
}
exports.findOne = findOne;