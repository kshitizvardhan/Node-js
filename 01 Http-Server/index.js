const express = require("express");
// this line of code, imports the very famous library - 'The Express'
const port = 3000;
// this line defines a constant variable named 'port' and assigns the value 3000 to it.
// It's commonly used to specify the port number on which the application will listen for incoming requests.
// It's not assigning a port from your local computer; rather, it's specifying the port number for your application to listen on.

const app = express();
// similar to in java, like creating a object from scanner class as sc, here we are creating app...but 
// This line creates an instance of the Express framework by invoking the express function.
// here express is not a class, rather a function that returns an Express application object
// The 'app' variable holds this application object, which allows you to configure and use various features provided by Express.
// similar to sc.nextInt() ==> taken to input integer in java.


app.get('/',(req,res) => {
    // This code defines a route handler for GET requests to the root path ('/') of the server.
    // Whenever a client makes a GET request to the root path, the control reaches this handler function.
    // The 'req' parameter represents the request object, containing information about the incoming request.
    // The 'res' parameter represents the response object, used to send a response back to the client.
    // In this handler function, 'res.send('Hello World')' sends the string 'Hello World' as the response to the client.
    res.send('Hello World');
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})