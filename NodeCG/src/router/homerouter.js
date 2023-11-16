const express = require('express')
const router = express.Router();
const ProductController= require('../app/controller/ProductController')
const upload = require('../ultil/upload')

router.get('/',ProductController.list)
router.delete('/delete/:id',ProductController.delete)
router.get('/create',ProductController.create)
router.post('/saveCreate',upload.single('image'),ProductController.save)
router.get('/edit/:id',ProductController.edit)
router.put('/saveEdit/:id',upload.single('image'),ProductController.saveEdit)
module.exports =router;