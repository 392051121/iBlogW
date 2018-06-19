var express = require('express');
var router = express.Router();

var checkLogin = function (req, res, next) {
	if(!req.session.user) {
		res.end('{"success":"err"}');
	}else if (req.session.user) {
		next();
	}
}

var checkNotLogin= function(req, res, next) {
	if(req.session.user) {
		req.flash('error', '已登录!');
		res.redirect('back');
	}
	next();
}
exports.checkLogin = checkLogin;
