//require modules
const express = require("express");
const app = express();
const routes = require("./routes/routes")
const connect = require("./db/connect")
const hbs = require("express-handlebars")
const bodyParser = require("body-parser")
//=====================//
//   connect mongo db
      connect();
//=====================//


//middleware
//======================
app.use("/",routes)
app.engine(".hbs", hbs({defaultLayout:"main",extname:".hbs"}))
app.set("view engine",".hbs")
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + '/public'));
//======================

//server listen 
//==========================================
app.listen(8080,()=>{
    console.log("Server is stated at port 8080")
});
//===========================================