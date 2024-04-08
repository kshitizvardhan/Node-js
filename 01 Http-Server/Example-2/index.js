const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]



app.get("/", (req,res) => {
    const johnKidneys = users[0].kidneys;       // john kidney array
    const numberOfKidneys = johnKidneys.length;     // number of kidneys in john
    const arrayHealthyKidneys = johnKidneys.filter((kidney) => {        // filtering healthy kidneys from john kidney array
        return kidney.healthy == true;
    })
    const healthyKidneys = arrayHealthyKidneys.length;                  // number of healthy kidneys in john
    const unhealthyKidneys = numberOfKidneys - healthyKidneys;          // number of unhealthy kidneys in john
    res.json({  
        numberOfKidneys,
        healthyKidneys,
        unhealthyKidneys
    })
})



app.use(bodyParser.json());
app.post("", (req,res) => {
    const isKidneyHealthy = req.body.isKidneyHealthy;           // taking input as true/false
    users[0].kidneys.push({                 //pushing the array with the input
        healthy: isKidneyHealthy            
    })
    res.json({
        message: "Done !"
    })
})



// replacing all the unhealthy kidneys with healthy kidneys
app.put("/", (req,res) => {
    for(let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})


// removing all the unhealthy kidneys
// also adding validation...ki if no unhealthy kidney return status code 411
app.delete("/", (req,res) => {
    if(checkUnhealthyKidney()){
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            message: "All unhealthy kidneys deleted"
        })
    } else {
        res.status(411).json({
            message: "No unhealthy kidneys"
        })
    }
})


function checkUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening to port ${port}`);
    console.log(`Visit URL http://localhost:${port}`);
})