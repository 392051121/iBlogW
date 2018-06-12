var baseSchema = require('./base').baseSchema;
var db = require('../dbmanager/db').mongoose;
var extend = require('mongoose-schema-extend');

var userSchema = baseSchema.extend({
	Username : {type: String},
	Password : {type: String}
})

exports.userModel = db.model('user', userSchema);
