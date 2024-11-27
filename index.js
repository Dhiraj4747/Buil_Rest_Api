const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const app = express();


const port = 3000;

//to display or render html data on browser 
app.get("/users",(req,res)=>{
   const html = 
   `<ul>
   ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
   
</ul>`
   res.send(html)
})

//middleware for post request
app.use(express.urlencoded({extended:false}));

//middleware 
app.use((req,res,next)=>{
   console.log("hii from middleawrwe")
   fs.appendFile("./log.txt",`${Date.now()}: ${req.method} : ${req.path}`,(err,data)=>{
      next()
   })
})

//to display or render json data on browser
app.get("/api/users",(req,res)=>{
   console.log("request is recevied")
   res.json(users)
})

app.get("/api/users/:id",(req,res)=>{
   const id = Number(req.params.id)
   const user = users.find(user => user.id === id)
   if(!user){
      console.log("user not found")
   }
   return res.json(user)
})



//for post or add the new user in json object 
app.post("/api/users",(req,res)=>{
   const body = req.body;
   users.push({...body,id:users.length + 1})
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
      return res.send({stauts:"pending", id :users.length})

   })
})

app.delete("/api/users/:id",(req,res)=>{
   console.log("delete req is resvied")
   const id = Number (req.params.id);
   const userindex = users.findIndex(user => user.id === id);

   users.splice(userindex,1);
   res.json({message: `${id}`})
})



app.listen(port,()=>{
   console.log(`Server is running on this ${port}`)

})

//for single route and apply multiple method
// app.get.route("/api/uers/:id")
// .get((req,res)=>{})
// .patch((req,res)=>{})
// .delete((req,res)=>{})