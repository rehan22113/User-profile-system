const express = require("express");
const routes = express.Router();
const collection = require("../model/structre")
const bodyParser = require("body-parser")
const flash = require("connect-flash");
const session = require("express-session");
routes.use(flash())
routes.use(session({
	secret:'secret123',
    resave:true,
    saveUninitialized:true
	}));
routes.use(express.json())
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));


routes.get("/",function (req,res){

res.render("index")
    
})
routes.post("/form",async(req,res)=>{

    const name = req.body.name;
    const birth = req.body.birth;
     const gender = req.body.gender;
     const email = req.body.email;
     const phone = req.body.phone;


    const data = new collection({
        name:name,
        birth:birth,
        gender:gender,
        email:email,
        phone:phone
    })
    await data.save();
    req.flash('info', 'Data save successfully')
    res.redirect("/show-data");
})

routes.get("/show",async(req,res)=>{
    res.render('login');
})
routes.post("/login",async(req,res)=>{
    try{
    const name = req.body.name;
    const email= req.body.email;
    const data = await collection.findOne({name:name})
    if(data.email == email)
    res.render("dashboard",{
        name:data.name,
        email:data.email,
        birth:data.birth,
        phone:data.phone,
        id:data.id
    })
    else
     res.send("Email not match | login detail incorect")
    }catch(err){
        console.log(err)
    }
})
routes.get("/show-data",async(req,res)=>{
    const data = await collection.find().lean()
    res.render("showData",{title:"User|Profile",data:data})
})

routes.get("/update/:id",async(req,res)=>{
    const id = req.params.id;
     const data = await collection.findOne({_id:id})
     const name= data.name;
     const email = data.email;
     const phone = data.phone;
     const birth = data.birth;
     res.render("updateForm",{name,email,phone,birth})
})
routes.post("/updated",async(req,res)=>{
    try{
    const names = req.body.nname;
    const name = req.body.name;
    const email = req.body.email;
    const birth = req.body.birth;
    const phone = req.body.phone;
    const update= await collection.updateOne({name:names},{$set:{name:name,email:email,phone:phone}}, function(err) {
        if(err)
        console.log(err);
      })
    res.send("Data Updated Successfully");
    }
    catch(err){
        console.log(err);
    }
})
routes.get("/remove/:id",async(req,res)=>{
   try{
    const id = req.params.id;
     const data= await collection.deleteOne({_id:id})
     
     res.render("login")
   }catch(err){
       console.log(err)
   }
})

module.exports = routes;