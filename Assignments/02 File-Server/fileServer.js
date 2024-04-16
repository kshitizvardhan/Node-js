const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filesNames = [];

app.get("/files",(req,res) =>{
    const directoryPath = "C:/Users/kshit/OneDrive/Desktop/Node.js/Assignments/File-Server";
    fs.readdir(directoryPath, "utf-8", (err, files) => {
        if(err){
            res.status(500).send("Error Could'nt retrieve files")
        }
        // files: It is an array of String, Buffer or fs.Dirent objects that contain the files in the directory.
        files.forEach(file => {
            filesNames.push(file);
        })
        res.json({
            files
        })
    })
})



app.get("/files/:fileName", (req,res) => {
    const fileName = req.params.fileName;
    const filePath = "C:/Users/kshit/OneDrive/Desktop/Node.js/Assignments/File-Server/" + fileName;
    fs.readFile(filePath, "utf-8", (err,data) => {
        if(err){
            if(err.code === "ENOENT"){
                res.status(404).send("<h1>Error 404 File Not Found </h1>")
            } else{
                res.status(505).send("<h1>Internal Server Error</h1>")
            }
        }else{
            res.json({
                data
            })
        }
    })
})

// function checkFile(fileName){
//     isFilePresent = false
//     for(let i=0; i<filesNames.length; i++){
//         if(fileName == filesNames[i]){
//             isFilePresent = true;
//         }
//     }
//     return isFilePresent;
// }

// We can use the above method but it is prone to errors and not reliable so..instead use fs.access or fs.stat or err.code =='ENONET'

app.all('*', (req,res) => {
    res.status(404).send("<h2> Route Not Found </h2>");
})


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening to port ${port}`);
    console.log(`Visit URL http://localhost:${port}`);
})

module.exports = app;


/*
'ENOENT' stands for "Error NO ENTry". It is a standard error code used in many operating systems, including Unix-based systems (such as Linux and macOS) and Windows.

In the context of Node.js file system operations, 'ENOENT' is typically thrown when an attempt is made to access a file or directory that does not exist. It indicates that the file or directory path provided does not refer to an existing entity on the file system.
*/