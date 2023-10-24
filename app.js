require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




main().catch(err => console.log(err));

async function main() {
 await  mongoose.connect(process.env.PRIVATE,{useNewUrlParser:true})};

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled



const hotelSchema = new mongoose.Schema ({
    name: String,
    email: String,
    message: String,
    rating: Number
});





const Hotel =mongoose.model("Hotel", hotelSchema);



const personSchema = new mongoose.Schema ({
    username: String,
    password: String
});


const Person  =mongoose.model("Person", personSchema);






app.get("/index", (req, res)=>{
    res.render("index")
});

app.get("/", (req, res)=>{
    res.render("index")
});




app.get("/login", (req, res)=>{
    res.render("login")
});

// app.get("/register", (req, res)=>{
//     res.render("register")
// });


app.get("/contact", (req,res)=>{
    res.render("contact");
});


app.get("/about", (req,res)=>{
    res.render("about");
});

app.get("/comment", (req, res)=>{
    res.render("comment");
});

app.post("/contact", (req,res)=>{
    const hotel = new Hotel({
       name:req.body.name,
       email:req.body.email,
       message:req.body.message,
       rating : req.body.rating
    });

    // hotel.save.then(foundhotel)=>{
    //     console.log(foundhotel)
    // }

    // hotel.save(function(err){
    //     if (!err){
    //         res.redirect("/contact");
    //     }
    //   });
       hotel.save().then(()=>{
        res.redirect("/contact");
       }).catch((err)=>{
        console.log(err);
       });
    });

    // app.post("/register", (req, res)=>{
    //     const newPerson = new Person({
    //         username: req.body.username,
    //         password: req.body.password
    //     });

    //     newPerson.save((err)=>{
    //         if(err){
    //             console.log(err);
    //         }else{
    //             res.render("login")

                
    //         }
    //     });
    // });


 app.post("/login",(req,res)=>{
  const  username= req.body.username;
  const  password= req.body.password;
  
 Person.findOne({username:username}).then((foundPerson)=>{
    if(foundPerson.password === password){
        res.render("register");
        // console.log("yes");
    }
 }).catch((err)=>{
    console.log(err);
 });
 });

 
//});

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});