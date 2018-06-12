var db = require('../dbmanager/db');
var userModle = require('../model/user').userModel;

var findOne = function(userName,callback){
	userModle.find({'Username':userName},function(err, data){
		if(err){
			return callback(err);
		}else{
			return callback(null,data);
		}
	});
}
exports.findOne = findOne;