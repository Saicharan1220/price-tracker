const axios =require('axios');
const jsdom =require("jsdom");
const mongoose =require("mongoose");
const {JSDOM} =jsdom;
/*
const args =process.argv.slice(2);
const url=args[0];
const minPrice =args[1];
*/
const url='https://www.amazon.in/Redmi-Activ-Carbon-Black-Storage/dp/B09GFPVD9Y' 

mongoose.connect('mongodb://localhost:27017/pricedb');
const nameSchema = new mongoose.Schema({
      price :Number,
      subje:String
});
const Price=mongoose.model('Price',nameSchema);

async function getPrices(){
    
    const {data :html}=await axios.get(url ,{
        headers :{
            Accept: 'application/json',
            'User-Agent': 'axios 0.27.2' 
        }
    });
    const dom =new JSDOM(html);
    const dataa= dom.window.document.querySelector('.a-offscreen').innerHTML;
    let numb = Number(dataa.replace(/[^0-9.-]+/g,"")); 
    run()
    async function run(){
        try{
    const amaz=new Price({
        price:numb,
        subje:"not yet decided"
         
    })
    if(numb<10000)
    amaz.subje="buy now";
 else{
    amaz.subje="price not decreased ";
 }
    await amaz.save();
    console.log(amaz);
}
catch(err){
    console.log(err);
} 
}
}

getPrices();