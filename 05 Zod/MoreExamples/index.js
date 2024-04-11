const express = require('express');
const zod = require('zod');

const app = express();

app.use(express.json());

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(12)    
})

function validateInput(req,res,next){
    const response = schema.safeParse(req.body);
    if(!response.success){
        res.status(411).json({
            Error: "Invalid Inputs"
        })
    } else{
        next();
    }
}

app.post("/login", validateInput, (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    res.json({
        email,
        password
    })

})

app.listen(3000);