var express = require("express")
var app = express()
var mysql = require("mysql")
var bodyParser = require("body-parser")
var exphbs = require("express-handlebars")

//always use for bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//set up handlebars
app.engine("handlebars", exphbs({
    defaultLayout:"main"
}))

app.set("view engine", "handlebars")

//set up PORT variable and connect configs
var port = process.env.PORT || 3000

if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burger"
    })
}




//set up connection
connection.connect()

app.use(express.static("public"))

// app.get("/", function(req,res){
//     res.render("index")
// })


//main burgers page, all burgers from database
app.get("/api/burgers", function(req,res){
    connection.query("select * from burger", function(err, results){
        res.send(results)
        console.log("results, api/burgers:", results)
    })
})



//renders burger names on DOM; GET request 
app.get("/", function(req,res){ 
    connection.query("select * from burger", function(err, results){
        res.render("index",{
            burgers:results
        })
    })
})


//add burger to database and DOM, POST request
app.post("/add-burger", function(req,res){
    var burgerName = req.body.name
    console.log("New burgerName:", burgerName)
        connection.query("insert into burger (burger_name, devoured) values (?,?)", [burgerName, false], function(error, results){
            res.send(results)
        })  
})


//set up local port
app.listen(port, function(){
    console.log("App is running on port 3000")
})