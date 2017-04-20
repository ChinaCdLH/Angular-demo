var mongoose = require('mongoose');
var bookListSchema = require('../schemas/booklist');

var book = mongoose.model('booklist', bookListSchema);

module.exports = book;
