const express = require('express');
const app = express();

function calculateSum(a,b){
    return a+b;
}

app.get('/',(req,res) => {
    console.log("Someone Just Hit");     // on your SmartPhone using "pvt. IP:3000/?a=5&b=5" hit this...it will log on computer
    // The laptop will be like a server where all the high computations is done...and it shall also be visible on my phone..which can't even run the code...
    // its like i am accessing my properiatry code on smartphone, server(which is my laptop here) handles the get request and gives me back a response
    const a = req.query.a;
    const b = req.query.b;
    const ans = calculateSum(parseInt(a),parseInt(b));
    res.send("Hi there, the sum is " + ans);       // sending in string else...express interprets the number something as status code.
})
// when parameters are added...after ?, then its no more a route...its a query 

const port = process.env.PORT || 3000;
// If process.env.PORT is not defined (which often happens in local development environments), it defaults to port 3000.
//  tools like dotenv to load environment variables from a .env file into process.env. However, by default, Node.js does not automatically load environment variables from a .env file. You need to explicitly load them using a library like dotenv.
// First install npm i dotnev then, this in file.
// require('dotenv').config();

app.listen(port,()=>{
    console.log(`App is listening to Port ${port}`);
    console.log(`Visit URL http://localhost:${port}`);
})


/* 
Real World USECASE(SCENARIO):
This setup allows your smartphone to communicate with the Express server running on your laptop. When you access the server from your smartphone, it sends a GET request to your laptop's IP address and port 3000, triggering the route handler. */

// So this is how you expose/ allow other people around the world to run your logic using http server.