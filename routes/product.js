const express = require('express')
const Product = require("../models/Product")
const Review = require("../models/Review")
const router = express.Router() //mini app instance
const {validateProduct,isLoggedIn,isSeller, isProductAuthor}=require('../middleware')


//to show all products
router.get('/products',async (req,res)=>{
    try{

        let products =await Product.find({})
    res.render("products/index",{products})
    }
    catch(e){
        res.status(500).render('error',{err :e.message})
    }
    
})

//to show form for new product
router.get('/product/new', isLoggedIn,(req,res)=>{
    try{
    res.render("products/new")
    }catch(e){
        res.status(500).render('error',{err :e.message})
    }
})


//to actually add a product
router.post('/products',validateProduct,isLoggedIn,isSeller,async (req,res)=>{
    try{
    let {name,img,price,desc}=req.body
    await Product.create({name,img,price,desc,author:req.user._id})
    req.flash('success','Product added successfully')
    res.redirect('/products')
    }catch(e){
        res.status(500).render('error',{err :e.message})
    }
})


//to show  a particular product
router.get('/products/:id', isLoggedIn,async (req,res)=>{
    try{
    let {id}=req.params
    let foundProduct=await Product.findById(id).populate('reviews')
    res.render('products/show',{foundProduct})
    }catch(e){
        res.status(500).render('error',{err :e.message})
    }
})


//to edit product form
router.get('/products/:id/edit', isLoggedIn,isSeller,isProductAuthor,async (req,res)=>{
    try{
    let {id}=req.params
    let foundProduct=await Product.findById(id)
    res.render('products/edit',{foundProduct})
    }catch(e){
        res.status(500).render('error',{err :e.message})
    }
})

//to actually edit 
router.patch('/products/:id', isLoggedIn,validateProduct,async (req,res)=>{
    try
    {
    let {id}=req.params
    let {name,img,price,desc}=req.body
    await Product.findByIdAndUpdate(id,{name,img,price,desc})
    req.flash('success',"Product edited successfully")
    res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error',{err :e.message})
    }
})


router.post('/products/:id/like', async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Login required' });
    }

    const product = await Product.findById(req.params.id);
    const userId = req.user._id;

    // Check if the user has already liked the product
    const alreadyLiked = product.likes.includes(userId);

    if (alreadyLiked) {
      // If already liked, unlike the product
      product.likes.pull(userId);
    } else {
      // If not liked, like the product
      product.likes.push(userId);
    }

    await product.save();

    // Return the updated like count and the new liked status
    res.json({ likesCount: product.likes.length, liked: !alreadyLiked });
});


//to delete 
router.delete('/products/:id', isLoggedIn,isProductAuthor,async (req,res)=>{
    // const product= await Product.findById(id)
    // for(let id of product.review)
    // {
    //       Review.findByIdAndDelete(id)   
    // }
   try{
    let {id}=req.params
    await Product.findByIdAndDelete(id)
    req.flash('success',"Product deleted successfully")
    res.redirect('/products')
   }    
    catch(e){
        res.status(500).render('error',{err :e.message})
    }
})

module.exports=router