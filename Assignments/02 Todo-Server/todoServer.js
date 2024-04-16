const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

let todos = [];

app.get("/todos", (req,res) => {
  res.json({
    todos
  })
})


app.get("/todos/:id", (req,res) => {
  let id = req.params.id;
  for(let i=0; i<todos.length; i++){
    if(todos[i].id == id){
      let todo = todos[i];
      res.json({
        todo
      })
    }
  }
})


app.post("/todos", (req,res) => {
  const newTodo = {
    id: Math.floor(Math.random()*1000),
    title: req.body.title,
    completed: req.body.completed,
    description: req.body.description
  }
  todos.push(newTodo);
  res.json({
    "message":"Todo added successfully"
  })
})


app.put("/todos/:id", (req,res) => {
  let id = req.params.id;
  for(let i=0; i<todos.length; i++){
    if(todos[i].id == id){
      todos[i].title = req.body.title;
      todos[i].completed = req.body.completed;
      todos[i].description = req.body.description;
      let todo = todos[i];
      res.json({
        "message":"Update todo successfully"
      })
    }
  }
})
  
app.delete("/todos/:id",(req,res) => {
  let id = req.params.id;
  for(let i=0; i<todos.length; i++){
    if(todos[i].id == id){
      todos.splice(i,1);     // splice methods add/remove array elements
      res.json({
        "message":"Deleted todo successfully"
      })
    }
  }
})

app.all("*", (req,res) => {
  res.status(404).send("<h1>Route Not Found</h1>")
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening to port ${port}`);
    console.log(`Visit URL http://localhost:${port}`);
})

  module.exports = app;


/*
fs.access() is a method in Node.js for checking the accessibility of a given file or directory. It checks if the current process has permission to read and/or write to the specified path.

Here's the syntax for fs.access() --- >> fs.access(path, mode, callback)

path: A string that specifies the file or directory path to check accessibility for.
mode: An optional integer that specifies the accessibility checks to be performed. It can be a combination of fs.constants.F_OK (checks if the file exists), fs.constants.R_OK (checks if the file is readable), and fs.constants.W_OK (checks if the file is writable). By default, it checks if the file exists (fs.constants.F_OK).
callback: A function that is called with an error if the operation fails, otherwise it is called with no arguments. If an error occurs, it usually means the file or directory is not accessible.

res.status(500).send("<h1>Internal Server Error - 500</h1>")
*/