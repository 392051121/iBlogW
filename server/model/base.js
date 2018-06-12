var db = require('../dbmanager/db').mongoose;
var extend = require('mongoose-schema-extend');

var baseSchema = new db.Schema({
    //唯一键
    //_id: {type: String, unique: true},
    //创建时间
    CreateTime: {type: Date},
    //修改时间
    ModifyTime: {type: Date}
});
exports.baseSchema = baseSchema;