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
    await db.collection("newuser").findOne({Email:req.body.email})
    .then((result)=>{
        if(result?.Password===req.body.password){
            res.json({message:"login success", values:result})
        } else {
            res.json({error:"failed to login"})
        }
    })
    .catch((e)=>console.log(e))
})
app.post('/signup', async(req, res) => {
<<<<<<< HEAD
    await db.collection("newuser").insertOne({Email:req.body.email,Name:req.body.name,Mobile:req.body.mobile,Password:req.body.password,Gender:req.body.gender,Athlete:req.body.athlete,Height:req.body.height,Weight:req.body.weight,Age:req.body.age})
=======
    await db.collection("newuser").insertOne({Email:req.body.email,Name:req.body.name,Mobile:req.body.mobile,Password:req.body.password,Athlete:req.body.athleteType,Gender:req.body.gender,Height:req.body.height,Weight:req.body.weight,Dateofbirth:req.body.dateofbirth})
>>>>>>> e3b3d7a195adb5a1064d5e0424736911a0defb5b
    .then((result)=>{
        if(result){
            res.json({message:"signup sucess", values:result})
        } else {
            res.json({error:"sign up failed"})
 }
    })
    .catch((e)=>console.log(e))
})

app.post('/resetpassword', async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const result = await db.collection("login").updateOne(
            { Email: email },
            { $set: { Password: newPassword } }
        );

        if (result.matchedCount > 0) {
            res.json({ message: "Password reset successful" });
        } else {
            res.status(404).json({ error: "No user found with this email address" });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
});
app.post('/meals', async (req, res) => {
    await db.collection("meals").insertOne({
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner: req.body.dinner,
    })
    .then((result) => {
      if (result) {
        res.json({ message: "Meal data saved successfully", values: result });
      } else {
        res.json({ error: "Failed to save meal data" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save meal data", details: error });
    });
  });


connectToDB(() => {
    app.listen(9001, () => {
        console.log("server running at 9001");
    })
})