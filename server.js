var express = require("express")
var app = express()
var mysql = require("mysql")
var bodyParser = require("body-parser")

var port = process.env.PORT || 3000

app.get("/", function(req,res){
    res.send("The app is working")
})

app.listen(port)