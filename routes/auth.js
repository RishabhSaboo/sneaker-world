const express = require('express')
const User = require('../models/User')
const passport = require('passport')
const router = express.Router() //mini app instance

router.get('/register',(req,res)=>{
    res.render('auth/signup')
})


router.post('/register',async (req,res)=>{
    let {username,email,password,role}=req.body
    const user = new User({username,email,role})
    const newUser = await User.register(user,password);
    //res.redirect('/login')
    req.login(newUser,(err)=>{
        if(err)
        {
            return next(err)
        }
        req.flash('success','welcome')
        return res.redirect('/products')

    })

})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})


router.post('/login', passport.authenticate('local', 
    { 
        failureRedirect: '/login', 
        failureMessage: true 
    }
    ),
    (req,res)=>{
        req.flash('success','welcome back')
        res.redirect('/products')
   
})



router.get('/logout', async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
});


module.exports=router