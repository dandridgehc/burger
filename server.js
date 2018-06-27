var express = require("express")
var app = express()
var mysql = require("mysql")
var bodyParser = require("body-parser")
var exphbs = require("express-handlebars")

//always use for bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.engine("handlebars", exphbs({
    defaultLayout:"main"
}))

app.set("view engine", "handlebars")

var port = process.env.PORT || 3000
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burger"
})

connection.connect()

app.use(express.static("public"))

// app.get("/", function(req,res){
//     res.render("index")
// })

app.get("/api/burgers", function(req,res){
    
    
    connection.query("select * from burger", function(err, results){
        res.send(results)
    })

})

app.get("/", function(req,res){
    
    
    connection.query("select * from burger", function(err, results){
        res.render("index",{
            burgers:results
        })
    })

})


app.post("/add-burger", function(req,res){
    var burgerName = req.body.name
    console.log(burgerName)


    connection.query("insert into burger (burger_name, devoured) values (?,?)", [burgerName, false], function(error, results){
        res.send(results)
    })

    
})

app.listen(port, function(){
    console.log("App is running on port 3000")
})