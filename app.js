const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const admin = require("./routes/admin")
const path = require('path')
const session =  require("express-session")
const flash = require("connect-flash")

// Settings
    //Session
        app.use(session({
            secret: "cursodeonde",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })

    //bodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars 
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main',  runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
   
        })) 
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://127.0.0.1:27017/appblog").then(() => {
            console.log("Mongo is connected!")
        }).catch((error) => {
            console.log("Error: "+error)
        })
    //Public
    app.use(express.static(path.join(__dirname, "public")))
   
// Routes
    app.use('/admin', admin)
// Others 

const PORT = 8081
app.listen(PORT, () => {
    console.log("Server is connected!")
})