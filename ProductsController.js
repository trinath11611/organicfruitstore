var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/pro',{ useNewUrlParser: true }, function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});
var productScheme = new mongoose.Schema({
   productID: String, 
   productName: String, 
   productDes: String 
});


var Products = mongoose.model('Products',productScheme);
var CartList = mongoose.model('CartList',productScheme);



var urlencodedParser = bodyParser.urlencoded({ extended:false });



module.exports = function(app){

    
    
    app.get('/', function(req,res){
       Products.find({} ,function(err,data){
            if(err) throw err;
            res.render('Products',{products: data});    
        });
    });

    
    
    
    app.post('/', urlencodedParser, function(req,res){
        var newProduct = CartList(req.body).save(function(err,data){
            if(err) throw err;
            res.render('Products',{products: data});
        });

    });





    app.get('/add',  function(req,res){
        res.render('Adding',{});
    });


    

    app.post('/add', urlencodedParser, function(req,res){
        var newProductItem = Products(req.body).save(function(err,data){
            if(err) throw err;
            res.render('Products',{products: data});
        });
    });




    app.get('/Cart', function(req,res){
        CartList.find({} ,function(err,data){
            if(err) throw err;
            res.render('Cart',{cartlist:data});    
        });
    });




    app.delete('/Cart/:id', function(req,res){
        CartList.find({"productID": req.params.id}).remove(function(err,data){
            if(err) throw err;
            res.render('Cart',{cartlist:data});
        });
    });

}