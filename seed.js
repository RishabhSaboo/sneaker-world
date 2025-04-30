const mongoose=require('mongoose')
const Product=require('./models/Product')

const products =[
{
 name : "Iphone14",
 img : "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 price : "130000",
 desc : "costly"
},
{
 name : "macbook m2",
 img : "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
 price : "150000",
 desc : "very costly"
},
{
 name : "I-watch",
 img : "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXdhdGNofGVufDB8fDB8fHww",
 price : "15000",
 desc : "time dekho"
},
{
    name : "Ipad",
    img : "https://plus.unsplash.com/premium_photo-1681139760927-4c510ce6d8f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
    price : "51000",
    desc : "mini screen"
}
]

async function seedDB(){

    await Product.insertMany(products)
    console.log("data seeded successfully")

}

module.exports = seedDB