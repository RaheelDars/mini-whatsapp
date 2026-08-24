const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chat.js")
const methodoverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("views engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"))

app.listen(8080,()=>{
    console.log("server is listenging");
    
});

app.get("/", (req,res)=>{
    res.send("Root is working")
    
})

main().then(()=>{
    console.log("connection is sucsessful");
    
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
// let chat1=new Chat({
//     from:"ali",
//     to:"raheel",
//     msg:"send me your exam sheet",
//     created_at:new Date()
// })
// chat1.save().then((res)=>{
//     console.log(res);
    
// })

app.get("/chats",async (req,res)=>{
    let chats= await Chat.find({})
    // console.log(chats);
    // res.send("working")
    res.render("index.ejs",{chats})
    

})
//new Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
// create route
app.post("/chats",(req,res)=>{
   let {from,to,msg}=req.body
   let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
   })
//    console.log(newChat);
   newChat.save().then((res)=>{
    console.log("chat was saved");
   }).catch((err)=>{
    console.log(err);
    
   })
   res.redirect("/chats")
   
})

app.get("/chat/:id/edit", async(req,res)=>{
    let {id}=req.params
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat})
})
//update Route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, returnNewDocument: true }
    );
    res.redirect("/chats"); 
});

//Delete Route
app.delete("/chat/:id", async (req, res)=>{
    let { id } = req.params;
    let DeletedChat= await Chat.findByIdAndDelete(id)
    console.log(DeletedChat);
    res.redirect("/chats")
    

})