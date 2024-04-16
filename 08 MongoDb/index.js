const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const jwtPassword = "123456";

mongoose.connect(
    "mongodb+srv://admin:3XUi07TpM67Z7YZJ@cluster0.bxeatmc.mongodb.net/user_app",
)

const User = mongoose.model("users", {
    name: String,
    username: String,
    password: String
});

const app = express();
app.use(express.json());

function userExists(username, password){
    // should check in the database
    
}


app.post("/signIn", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username,password)){
        return res.status(403).json({
            msg: "User doesn't exist in our mongoose database"
        })
    }

    var token = jwt.sign({username:username}, jwtPassword);
    res.json({
        token,
    })
})

app.get("/users", (req,res) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
    } catch (err){
        return res.status(403).json({
            msg: "Invalid Token",
        })
    }
})


app.listen(3000);

