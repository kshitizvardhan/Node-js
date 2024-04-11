const zod = require('zod');

function validateInput(obj){
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6).max(12)       // minimum 6 and maximum 12 character password
    })

    const response = schema.safeParse(obj);
    console.log(response);
    if(response.success){
        const email = response.data.email;
        const password = response.data.password;
        console.log(email);
        console.log(password)
    }

}

validateInput({
    email: "kshitizvardhan8@gmail.com",
    password: "fsdj33j45k4k"
})

