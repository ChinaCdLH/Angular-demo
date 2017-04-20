//加载模块
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var book = require('./models/booklist')

//链接数据库
mongoose.connect('mongodb://localhost/book');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("MongoDB connection success！")
});
//创建对象 
var app = express();

app.set('views','./views') //告诉express 我们的 模板放在那里了
app.engine(".html",ejs.__express);
app.set("view engine","html") //告诉express 把模板的后缀改成html

//中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("static"))


//获取页面
app.get('/bookControl',function(req,res){
    res.render('bookControl');
})

app.post('/dataGet',function(req,res){
	book.find({},function (err, booklist) {
    	if (err) return console.error(err);
   		res.json({booklist:booklist})
	})
})

app.post('/deleteBook',function(req,res) {
	var body = req.body;
	var data = {"id":body.index};
	book.remove(data,function(err,doc){

	});
	res.json({"status" : 1})
})


app.post('/addBook',function(req,res) {
	var body = req.body;
	book.create({
		"Book":body.Book,
		"Author":body.Author,
		"Price":body.Price
	})
	res.json({"status":1})
})

app.post('/save',function(req,res){
	var body = req.body;
	data = body.
	book.remove(data,function() {

	})
	book.create({
		"Book":body.Book,
		"Author":body.Author,
		"Price":body.Price
	})
})

//起服务
app.listen(8090,function() {
	console.log("server open")
});