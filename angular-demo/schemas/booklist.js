var mongoose = require('mongoose');

var bookListSchema = mongoose.Schema({
	Book:String,
	Author:String,
	Price:String
})

module.exports = bookListSchema;