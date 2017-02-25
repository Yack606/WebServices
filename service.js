"use strict";

var soap = require('soap');
var http = require('http');
var xml = require('fs').readFileSync('autorizacija.wsdl', 'utf8');
var express = require("express")

var service = {
    AutorizacijosServisas: {
        autPort : {
            patvirtinimas: function (args) {
              var match = false
              if(args["email"]=="email@email.com"&&args["slaptazodis"]=="123"){
                match = true;
              }
                return {
                    tikrinimas:match
                }
            }
        }
    }
};


var server = http.createServer(function(request,response) {
    response.end("404: Not Found: " + request.url);
});

server.listen(8001);
soap.listen(server, '/tears', service, xml);
