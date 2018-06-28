var baseSchema = require('./base').baseSchema;
var db = require('../dbmanager/db').mongoose;
var extend = require('mongoose-schema-extend');

var articleSchema = baseSchema.extend({
	title : {type: String},
	catalog : {type: String},
	status : {type: String},
	article : {type: String},
	browseNum:{type: Number}
})

exports.articleModel = db.model('articles',articleSchema,'articles');
