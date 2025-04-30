const express=require('express')
const { dirname } = require('path')
const app=express()
const path=require('path')
const mongoose = require('mongoose');
const seedDB =require("./seed")
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override')
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/User')

const productRoutes=require('./routes/product')
const reviewRoutes=require('./routes/review')
const userRoutes=require('./routes/auth')
const cartRoutes=require('./routes/cart')


mongoose.connect('mongodb+srv://rishabh:rishabh@cluster0.6abilku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => 
    console.log('DB Connected!')
)
  .catch(
    (err) => 
    {console.log('error');
    console.log(err)}
);

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

let configSession= {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {   
    httpOnly: true,
    expires : Date.now()+24*7*60*60*1000,
    maxAge : 24*7*60*60*1000
  }

}


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session(configSession))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//seedDB()

app.use(productRoutes)//har incoming request pe chalega
app.use(reviewRoutes)
app.use(userRoutes)
app.use(cartRoutes)


app.listen(8080,()=>{
    console.log("server connected at 8080")
})

