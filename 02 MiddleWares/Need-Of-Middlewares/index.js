const express = require('express');
const app = express();

/*
app.get("/health-Checkup", (req, res) => {
    // authorization of user
    const username = req.headers.username;
    const password = req.headers.password;
    
    if(username != "Kshitiz" && password != "pass"){
        return
    }

    // main handler logic
    res.json({
        "message":"Your health is Ok"
    })

    // every time we create a route, we need to add the logic of authorization...which makes the code...repeated...
    // So here comes the middlewares, which reduces the code, by reusing the logics...
    // Middlewares are like a prechecks to the data..before running the actual handler's logic...
})

*/


// rate limiter
let numberOfRequests = 0;
function calculateRequests(req,res,next){
    numberOfRequests++;
    console.log(numberOfRequests);
    next();
}

function auth(req,res,next) {
    const username = req.headers.username;
    const password = req.headers.password;
    
    if(username != "Kshitiz" && password != "pass"){
        return res.status(401).json({ 
            message: "Unauthorized" 
        });

    } else {
        next();     // this moves the thread/ control further..if the prechecks are fine and validated
    }
}

app.get("/health-Checkup", auth, calculateRequests, (req, res) => {
    res.json({
        "message":"Your health is Ok"
    })
})


const port = 3000;
app.listen(port);
// now the code looks more readable...and handlers can be understood easily...
// whenever the get request is hit the auth middleware authenticates the data and then further the req,res callbacks are done
// the control moves further only if the next() middleware function is hit in the callback functions...if not soo...it should return the expected error


// So, here also to reduce more...that is instead of passing the auth, calculateRequests in every route....you can use 
// app.use(calculateRequests) and
// app.use(auth)

// By adding this two lines... the routes defined AFTER these two lines will go for the prechecks automatically.. we dont't need to specifiy them in every route...(shall only be done in the case, where you know that you want the middleware to be used in every route..)

// app.get("/health-Checkup", (req, res) => {
       // goes through auth middleware first, then calculateRequests...though not mentioned..this the use of app.use() function 
//     res.json({
//         "message":"Your health is Ok"
//     })
// })


/*
all routes defined after app.use(auth) and app.use(calculateRequests) will automatically go through these middleware functions without needing to specify them for each individual route. This makes the code cleaner and more maintainable.
*/