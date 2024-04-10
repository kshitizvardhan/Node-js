/*
Input validation helps prevent unexpected or malicious input from causing crashes or errors in your server application. Without proper input validation, your server might be susceptible to various types of attacks or may behave unpredictably when it receives invalid data.

In situations where input validation fails, exposing detailed error messages, including stack traces or internal implementation details, is not desirable from both a security and a user experience perspective. These error messages may reveal sensitive information about your server's architecture, potential vulnerabilities, or proprietary code, which can be exploited by attackers.

To handle errors gracefully and avoid exposing sensitive information to users, it's common practice to implement global error handling mechanisms. These mechanisms catch and handle errors at a higher level, providing more user-friendly error messages or generic error pages while logging detailed error information for developers or administrators to diagnose and fix issues.

By implementing global error handling, you can maintain the security and integrity of your application while providing a better user experience by presenting friendly error messages instead of exposing technical details to users.
*/


const express = require('express');
const app = express();

app.use(express.json());

app.post("/health", (req, res) => {
    const kidneys = req.body.kidneys;
    const numberOfKidneys = kidneys.length;

    res.send({ message: "You have " + numberOfKidneys + " kidneys" });
});


// global-catches --> always written at the end...so if any exception occurs...it catches and and don't show the server' sensitive information
app.use(function(err, req, res, next){
    console.log(err);           // Consoling for debugging purposes...
    res.status(500).send("<h1>Something's bad with the server!! Inconveinence Regretted.</h1>")
    // here next() can be used if there multiple error handling middlewares further...like..it might be some..logs to server in a separate file
    // some displays users the message..etc...and so on
})

app.listen(3000);