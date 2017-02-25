'use strict'
var soap = require('soap');
var url = 'http://localhost:8001/tears?wsdl';
var session = require('express-session');
var express = require("express");
var myParser = require("body-parser");
var app = express();


app.use(myParser.urlencoded({extended : true}));
app.use(session({secret: 'dkfjugdkjdjgkjijg',saveUninitialized: true,resave: true}));

app.use("/login",express.static(__dirname,{index:"/login.html"}));


app.get("/login", function (request, response){
  if(request.session.user){
    response.redirect('/');}
    else
    console.log(request.session.user);

});
app.get("/logout", function (request, response){
request.session.destroy();
response.redirect("/login");
});
app.get("/", function (request, response){
  if(request.session.user){
  response.write('<h1>Sveiki prisijunge '+request.session.user+', geros dienos!</h1><br>');
response.end('<a href='+'/logout'+'>Atsijungti</a>');}
else{
  response.redirect('/login');
}
});
app.post("/login", function(request, response) {




    soap.createClient(url, function(error, client) {
        if (error) {
            throw error;
        }

        var data = {
            email:      request.body.email,
            slaptazodis:  request.body.slaptazodis

        }

        client.describe().AutorizacijosServisas.autPort;
        client.patvirtinimas(data,function(err,res){
                if (err) throw err;

                // Response from web service
                if(res){
                  request.session.user = data["email"];
                  response.redirect('/');
              }
        });
    });


 });



app.listen(8080);
