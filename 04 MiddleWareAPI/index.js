const express = require('express');
const app = express();

async function checkWeather(req,res,next){
    await fetch();
    next();
}

// or

function checkWeather(req,res,next){
    fetch().then(() =>{
        next();
    })
}

app.listen(3000);