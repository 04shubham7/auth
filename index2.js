// Description: This code demonstrates how to generate a JWT token using the jsonwebtoken library in Node.js.// It includes the necessary imports, sets up an Express server, and generates a token with a secret key.
// The token can be used for authentication in a web application.
const jwt=require('jsonwebtoken');
const express = require('express'); 

const app = express();
app.use(express.json());

// decode,verify,generate
const val={
    name:"Shubham",
    acc_no:"1234567890",
}

// jwt
const token=jwt.sign(val,"secret");
// this token has been generated using the secret key "secret" and the value object
// The token can be used to authenticate requests

console.log(token);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



// TRY CATCH BLOCK

function getLength(name){
    return name.length;
}
try{
    const ans=getLength("Shubham");
    console.log(ans);
}catch(e){
    console.log("Error: " + e.message);
    // This will catch any error that occurs in the try block
    // and log the error message to the console
}
// The above code will throw an error because the getLength function expects a parameter
// but it is called without any arguments. The catch block will handle the error and log the message.
// This is a simple example of error handling in JavaScript using try-catch blocks.
console.log("hi there")