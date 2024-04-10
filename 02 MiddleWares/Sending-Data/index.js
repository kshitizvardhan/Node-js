const express = require('express');
const app = express();

app.use(express.json()) // body parser


// 1. Send data via URL in Query String
app.post("/check", (req,res) => {
    const a = req.query.a;
    const b = req.query.b;
    console.log(req.query)
    res.send(req.query)
})
// http://localhost:3000/check?a=5&b=6




// 2. Send data via Request Body
app.post("/check", (req,res) => {
    const a = req.body.a;
    const b = req.body.b;
    console.log(req.body)
    res.json(req.body)
})
// http://localhost:3000/check




// 3. Send data via URL in Path Parameters ( Send data via Request Params )
app.post("/check/:a/:b", (req,res) => {
    const a = req.params.a;
    const b = req.params.b;
    console.log(req.params) // Access route parameters
    res.json({ 
        params: req.params 
    })                     
    // Send route parameters in response
})
// http://localhost:3000/check/10/20
// if you make a POST request to /check/10/20, a will be "10" and b will be "20" within your route handler function. 




// 4. Authenticate/ send data via headers
app.post("/check", (req,res) => {
    const a = req.headers['authorization'];
    const b = req.headers['content-language'];
    console.log(req.headers);
    res.json({ a, b });
});
// http://localhost:3000/check





const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})