const express = require('express')
const Product = require("../models/Product")
const Review = require("../models/Review")
const router = express.Router() //mini app instance
const {validateReview}=require('../middleware')

//to add products review
router.post('/products/:id/review',validateReview,async (req,res)=>{
    try{
    let {id}=req.params
    const product =await Product.findById(id)
    let{rating,comment} =req.body
    const review=new Review({rating,comment})
    product.reviews.push(review)
    await review.save()
    await product.save()
    req.flash('success','Reviews added successfully')
    res.redirect(`/products/${id}`)
    }
    catch(e)
    {
        res.status(500).render('error',{err:e.message})
    }

})

module.exports=router