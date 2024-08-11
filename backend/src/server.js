import cors from 'cors';
import express from 'express';
import { connectToDB ,db} from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})

app.post('/signin', async(req, res) => {
    await db.collection("hari").findOne({Email:req.body.email})
    .then((result)=>{
        if(result?.Password===req.body.password){
            res.json({message:"login sucess", values:result})
        } else {
            res.json({error:"user not found"})
        }
    })
    .catch((e)=>console.log(e))
})
app.post('/signup', async(req, res) => {
    await db.collection("hari").insertOne({Email:req.body.email,Name:req.body.name,Mobile:req.body.mobile,Password:req.body.password})
    .then((result)=>{
        if(result){
            res.json({message:"signup sucess", values:result})
        } else {
            res.json({error:"sign up failed"})
 }
    })
    .catch((e)=>console.log(e))
})




connectToDB(() => {
    app.listen(9001, () => {
        console.log("server running at 9001");
    })
})