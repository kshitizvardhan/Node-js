const mongoose = require('mongoose');
const express = require('express'); // now httpfiy the thingy....firstlu understood without this
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://admin:3XUi07TpM67Z7YZJ@cluster0.bxeatmc.mongodb.net/user_app")

const User = mongoose.model("users", {
    username: String,
    email: String,
    password: String
});

// const user = new User({
//     name: 'Kshitiz',
//     email: 'kshitiz@gmail.com',
//     password: '123456'
// })

// user.save();

app.post("/signUp", async (req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({username: username});      // this is mongoose inbuilt function to check it user present...
    if(existingUser){
        return res.status(400).json({
            msg: "User already exists"
        })
    }

    const user = new User({
        username: username,
        email: email,
        password: password
    })

    user.save();        // this is how the data is stored on Db

    res.json({
        msg: "user created successfully"
    })
    
})

app.listen(3000);