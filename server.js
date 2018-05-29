var express = require("express")
var app = express()
var mysql = require("mysql")
var bodyParser = require("body-parser")

app.get("/", function(req,res){
    res.send("The app is working")
})

app.listen(3000)