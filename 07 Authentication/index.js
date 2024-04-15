const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

const app = express();
app.use(express.json())

const ALL_USERS = [
    {
        username: "kshitiz@gmail.com",
        password: "123",
        name: "Kshitiz Vardhan"
    },
    {
        username: "mohnish@gmail.com",
        password: "123321",
        name: "Mohnish Kaplish"
    },
    {
        username: "manan@gmail.com",
        password: "123321",
        name: "Manan Syal"
    },
    {
        username: "arsh@gmail.com",
        password: "123",
        name: "Arsh Garg"
    },
    {
        username: "tanay@gmail.com",
        password: "123",
        name: "Tanay Srivastava"
    },
    {
        username: "tanishaa@gmail.com",
        password: "123",
        name: "Tanisha"
    },
    {
        username: "Khushi@gmail.com",
        password: "123",
        name: "Khushi Khandela"
    }
]

function userExists(username, password){
    // write logic to return true or false if this user exists
    // in ALL_USERS Array
    let userExists = false;
    for(let i=0; i<ALL_USERS.length; i++){
        if(username == ALL_USERS[i].username && password == ALL_USERS[i].password){
            userExists = true;
        }
    }
    return userExists;
}

app.post("/signIn", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "User does not exists in our memory database",
        });
    }

    var token = jwt.sign({ username : username }, jwtPassword);
    return res.json({
        token,
    });
})


app.get("/users", (req,res) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);     // the password must be same while making sign and verifying...else it will show exception
        // getting the username of the user who sent the get request
        const username = decoded.username;
        // return a list of users other than his username
        res.json({
            users: ALL_USERS.filter((element) => {
                if(element.username == username){
                    return false;
                } else {
                    return true;
                }
            })
        })
    } catch (err){
        return res.status(403).json({
            msg: "Invalid Token",
        });
    }
})

app.listen(3000);