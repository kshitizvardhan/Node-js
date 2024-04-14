const express = require('express');
const fetch = require('node-fetch');
const app = express();

async function getData(req,res,next) {
    const response = await fetch("https://fakerapi.it/api/v1/persons")
    const data = await response.json();
    return data;
}

app.get("/getMockData", (req,res) => {
    console.log(getData());
}) 

app.listen(3000);

/*
const fetch = require('node-fetch');
              ^
              
Error [ERR_REQUIRE_ESM]: require() of ES Module C:\Users\kshit\OneDrive\Desktop\Node.js\06 Fetch\node_modules\node-fetch\src\index.js from C:\Users\kshit\OneDrive\Desktop\Node.js\06 Fetch\index.js not supported.
Instead change the require of C:\Users\kshit\OneDrive\Desktop\Node.js\06 Fetch\node_modules\node-fetch\src\index.js in C:\Users\kshit\OneDrive\Desktop\Node.js\06 Fetch\index.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (C:\Users\kshit\OneDrive\Desktop\Node.js\06 Fetch\index.js:2:15) {
  code: 'ERR_REQUIRE_ESM'
}

Node.js v21.6.2
[nodemon] app crashed - waiting for file changes before starting...

*/