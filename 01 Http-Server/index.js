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
    res.send("Hello World")
})

app.get('/route-handler',(req,res) => {
    res.json({
        name: "Kshitiz",
        age: 18,
        list: [{
            fruit: 2,
            veggies: 3
        },90,34]
    });
})

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/conversation',(req,res) => {
    console.log(req.headers);
    console.log(req.body);      // we recieve undefined...
    res.json({
        msg: "2 + 2 = 4"
    })
})

/*
If you're receiving undefined for req.body in your Express.js route handler, it typically means that we haven't configured body parsing middleware for your application. To parse incoming request bodies, you can use middleware like body-parser
We will see about middlewares next

After using body-parser we did'nt recieved undefined....rather the json we sent using postman
becoz the express doesnt provides this feature of reading body...
so we handle them using other library called "Node.js body parsing middleware".
run npm i body-parser to install the dependency

Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

This module provides the following parsers:
    - JSON body parser
    - Raw body parser
    - Text body parser
    - URL-encoded form body parser
*/

app.get('/send-html',(req,res) => {
    res.send("<b> Hello Kshitiz </b>")
    // basically a string is sent...but browser sees that it look likes a sort of html.. so like this html is sent without .html file
    // sending a string response that contains HTML markup. When the browser receives this response, it interprets the content as HTML and renders it accordingly.
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})
/*
simply, application will be taking this port...and use it to listen for incoming connections.

app.listen() --> means that your application will start listening for incoming connections on the specified port.

The port variable is typically defined earlier in your code and represents the port number that your application will listen on. When a client sends a request to your server on that port, your Express application will handle the request and send back a response.

The console.log() statement inside the callback function will print a message to the console indicating that your application is now listening on the specified port. This is useful for debugging and monitoring purposes, as it lets you know that your server has started successfully and is ready to handle requests.


*/


// so we don't need the http module... the express internally provides us this...
// some very smart people have written all the code of http module....like how will get,post,delete....etc methods will work...
// we are just using these methods to write our own application specific code...under the hood http module takes care of its functioning.