const mongoose = require('mongoose');
const Chat=require("./models/chat.js")

main().then(()=>{
    console.log("connection is sucsessful");
    
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
let allChats=[
    {
    from:"ali",
    to:"raheel",
    msg:"send me your exam sheet",
    created_at:new Date()
   },
   {
    from:"dani",
    to:"ali",
    msg:"send me your pic",
    created_at:new Date()
   },
   {
    from:"abdullah",
    to:"insall",
    msg:"send me your data",
    created_at:new Date()
   },{
    from:"minhaj",
    to:"hamza",
    msg:"Bhair aa ",
    created_at:new Date()
   },{
    from:"dil",
    to:"umer",
    msg:"Secn on hai",
    created_at:new Date()
   },{
    from:"Manghi",
    to:"Hamas",
    msg:"pappa kha ho",
    created_at:new Date()
   }
]
 Chat.insertMany(allChats)

