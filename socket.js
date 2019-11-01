var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

    // var io=soc(http);
    app.get('/',function (req,res) {
        var a=__dirname+"/form.html";
    // console.log(a);
        res.sendFile(__dirname+'/form.html');
    });

    io.on('connection',function(socket){
    console.log('Connection made');

    socket.on('disconnect',function(){
    console.log("disconnected ");
    });
    });
    
    http.listen(8000,function(){
    console.log('Server running at 8000');
});
