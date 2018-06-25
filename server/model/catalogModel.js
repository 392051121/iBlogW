var baseSchema = require('./base').baseSchema;
var db = require('../dbmanager/db').mongoose;
var extend = require('mongoose-schema-extend');

var catalogSchema = baseSchema.extend({
	catalog : {type: String}
})
exports.catalogModel = db.model('catalog',catalogSchema,'catalog');
