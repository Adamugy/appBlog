const express =require('express')
const mongoose = require('mongoose')
const router = express.Router()
require("../models/Category")
const Category = mongoose.model("category")

router.get('/', (req, res)=>{
    res.render("admin/index")
})
router.get('/posts', (req, res)=>{
    res.send("Page of Posts")
})

router.get('/category', (req, res)=>{
    Category.find().sort({date: 'desc'}).then((category)=> {
        res.render("admin/category", {category: category})
    }).catch((error) => {
        req.flash("error_msg", "try again")
        res.redirect("/admin")
    })
    
})

router.get('/category/add', (req, res) => {
    res.render("admin/addcategory")
})

router.post('/category/new', (req, res) => {

    var errors = []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        errors.push({text: "Name invalid"})
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        errors.push({text: "Slug invalid"})
    }
    if (req.body.name.length < 2) {
        errors.push({text: "Name category is short too"})
    }

    if (errors.length > 0) {
        res.render("admin/addcategory",{errors: errors} )
    } else{

        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }
    
        new Category(newCategory).save().then(() => {
            req.flash("seccess_msg", "Category created successfull")
            res.redirect("/admin/category")
        }).catch((error) => {
            req.flash("error_msg", "ERROR, try again")
            console.log("Error: "+error)
            res.redirect("/admin")
        })
    }
})

router.get('/category/edit/:id', (req, res) => {
    Category.findOne({_id:req.params.id}).then((category) => {
        res.render("admin/editcategory", {category: category})
    }).catch((error) => {
        req.flash("error_msg", "It is not exist")
        res.redirect("/admin/category")
    })
   
})

router.post('category/edit', (req, res) => {
    Category.findOne({_id:req.body.id}).then((category) => {

        category.name = req.body.name
        category.slug = req.body.slug

        category.save().then((category) => {
            req.flash("success_msg", "success edit category")
            res.redirect("/admin/category")
        }).catch((error) => {
            req.flash("error_msg", "Erro")
            res.redirect("/admin/category")
        })
        
        
    }).catch((error) => {
        req.flash("error_msg", "Erro in the edit category")
        res.redirect("/admin/category")
    })
})


module.exports = router

