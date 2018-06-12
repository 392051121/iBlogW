var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/iBlogw");

var db = mongoose.connection;
db.on('connected',function(){
	console.log('Mongoose connection opend');  
});

db.on('error',function(err){
	console.log('Mongoose connection error ' + err);  
});

db.on('disconnected',function(){
	console.log('Mongoose connection disconnected');  
});

exports.mongoose = mongoose;