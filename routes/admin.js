const express =require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Page main of the  Adm panel")
})
router.get('/posts', (req, res)=>{
    res.send("Page of Posts")
})

router.get('/category', (req, res)=>{
    res.send("Page of cotegory")
})

module.exports = router

