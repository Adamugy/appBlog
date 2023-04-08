const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
//const mongoose = require('mongoose')
const app = express()
const admin = require("./routes/admin")
const path = require('path')


// Settings
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
        //Soon in comming
    //Public
    app.use(express.static(path.join(__dirname, "public")))
   
// Routes
    app.use('/admin', admin)
// Others 

const PORT = 8081
app.listen(PORT, () => {
    console.log("Server is up!")
})