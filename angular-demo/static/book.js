
var myapp = angular.module('bookConrol',[]);
 myapp.service('bookService',function() {
 	this.bookSearch = function(ty,inputVal) {
 		var Obj = {};
		Obj[ty] = inputVal;
		return Obj;
	},
	this.findBookname = function(typaName) {
		typaName = '书名';
		return typaName
	}
	this.findBooktype = function(ty){
		ty = 'Book';
		return ty
	}
	this.findAuthor = function(typaName) {
		typaName = '作者';
		return typaName
	}
	this.findAuthortype = function(ty){
		ty = 'Author';
		return ty
	}
	this.findPirce = function(typaName) {
		typaName = '价钱';
		return typaName
	}
	this.findPricetype = function(ty){
		ty = 'Price';
		return ty
	}
	this.changesort = function(order,cl) {
		order = cl; 
		return order
	}
	this.changesort1 = function(ck) {
		ck = !ck;
		return ck
	}
    this.deleteBook = function(scope) {
    	$.post('/deleteBook',{index:scope.getIndex},function(data){
    		if(data.status == 1){
    			scope.datas.splice(scope.getIndex,1)
    		}
    	})
    }
	this.addBook = function(scope) {
		for(var i = 0 ; i < scope.datas.length ; i ++){
    		if('0'+ scope.idVal == scope.datas[i].id){
    			alert("信息填写错误，请重新填写")
    			scope.idVal='';
				scope.bookVal='';
				scope.AuthorVal='';
				scope.PriceVal='';
    		}
    	}
    	$.post('/addBook',{"Book":scope.bookVal,"Author":scope.AuthorVal,"Price":scope.PriceVal},function(data) {
    		if(data.status == 1){
    			if(scope.idVal && scope.bookVal && scope.AuthorVal && scope.PriceVal){
					if(scope.idVal.length == 1){
						scope.idVal = '0'+scope.idVal
					}
					scope.datas.push({'id':scope.idVal,'Book':scope.bookVal,'Author':scope.AuthorVal,'Price':scope.PriceVal});
					scope.idVal='';
					scope.bookVal='';
					scope.AuthorVal='';
					scope.PriceVal='';
				}else{
					scope.idVal='';
					scope.bookVal='';
					scope.AuthorVal='';
					scope.PriceVal='';
				}
    		}
    	})
	};
	this.setIndex = function(scope,idx) {
		scope.getIndex = idx
	}
	this.update = function(index, scope) {
		$('#modal-1').modal('show');
		scope.prod.productBook = scope.datas[index].Book;
		  	scope.prod.productAuthor = scope.datas[index].Author;
		    scope.prod.productPrice = scope.datas[index].Price;
		  	scope.prod.productId = scope.datas[index].id;
		  	scope.idx = index;
	}
	this.save = function(scope) {
		$.post('/save',{Book:scope.prod.productBook,Author:scope.prod.productAuthor,Price:scope.prod.productPrice})
		scope.datas[scope.idx].Book = scope.prod.productBook ;
		  	scope.datas[scope.idx].Author = scope.prod.productAuthor;
		  	scope.datas[scope.idx].Price = scope.prod.productPrice;
		  	if(scope.prod.productId.length == 1){
		  		scope.datas[scope.idx].id = '0' + scope.prod.productId;
		  	}else{
		  		scope.datas[scope.idx].id = scope.prod.productId;
		  	}
	}
 })
myapp.controller('myController',['$scope','$http','bookService',function($scope,$http,bookService) {
	$scope.type = 'Book';
	$scope.searchType = '书名';
	$scope.ck = false;
	$scope.order = 'id';
	$scope.datas = [];
	$scope.prod = {};
	$scope.idx = 0;
	$.ajax({
		url:"/dataGet",
		async:false,
		type:'post',
	})
	.then(function(data) {
		$scope.result = data.booklist;
		for(i in $scope.result){
			$scope.datas.push($scope.result[i])
		}
	})
	console.log($scope.datas)
	$scope.search = function(type) {
		return bookService.bookSearch($scope.type,$scope.searchVal)
	}
    $scope.setIndex = function(idx) {
		bookService.setIndex($scope,idx)
	}
    $scope.deleteBook = function() {
    	bookService.deleteBook($scope)
    }
    $scope.addBook=function(){
    	bookService.addBook($scope)
	};
	$scope.findBookname = function() {
		$scope.searchType = bookService.findBookname($scope.searchType);
		$scope.type = bookService.findBooktype($scope.type)
	}
	$scope.findAuthor = function() {
		$scope.searchType =  bookService.findAuthor($scope.searchType);
		$scope.type = bookService.findAuthortype($scope.type)
	}
	$scope.findPirce = function() {
		$scope.searchType =  bookService.findPirce($scope.searchType)
		$scope.type = bookService.findPricetype($scope.type)
	}
	$scope.changesort = function(cl) {
		$scope.order = bookService.changesort($scope.order,cl)
		$scope.ck = bookService.changesort1($scope.ck)
	}
	$scope.update = function(index){
		bookService.update(index,$scope)
	}
	$scope.save = function() {
		bookService.save($scope)
	}
}])		



