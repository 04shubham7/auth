const express = require('express');

const app = express();

app.use(express.json());


//  USING TOKENS FOR AUTHENTICATION
const users=[];

//[ 
// {username: 'user1', password: 'pass1'},
// ]

// function generateToken(username) {
//     // This is a placeholder for token generation logic
//     return Buffer.from(username).toString('base64');
// }


// app.get('/', (req, res) => {
//     res.status(200).send('Welcome to the Home Page');
// });

// app.post('/signin', (req, res) => {

//   const username = req.body.username;
//   const password = req.body.password;
  
//   const user = users.find(user => user.username === username && user.password === password);
//   if (!user) {
//     return res.status(401).send('Invalid username or password');
//   }
  
// const token = generateToken(username);
// // Store the token in the user object
// user.token = token;
// console.log("You are signed in successfully");  
// console.log(users);
// return res.status(200).json({ token: token });
  
// });

// app.post('/signup', (req, res) => {
//   //input validations later
//   const username = req.body.username;
//   const password = req.body.password;
  
//    if(users.find(user => user.username === username)) {
//      return res.status(400).send('Username already exists');
//    }

//   users.push({
//      username : username,
//      password : password
//      });
//     res.status(200).send('User signed up successfully');
//     console.log(users);
// });

// app.get('/me', (req, res) => {
//   // Read token from 'authorization' header (e.g., Authorization: Bearer <token>)
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
//   const Fuser = users.find(user => user.token === token);
//   if (!Fuser) {
//     return res.status(401).send('Unauthorized');
//   }  
//   res.status(200).json({ username: Fuser.username, password: Fuser.password });
// });





// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// }   );






// USING JWT FOR AUTHENTICATION
const jwt = require('jsonwebtoken');
const JWT_SECRET="your_jwt_secret_key"; // Replace with your secret key



//[ 
// {username: 'user1', password: 'pass1'},
// ]

function generateToken(username) {
    // This is a placeholder for token generation logic
    return Buffer.from(username).toString('base64');
}


app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page');
});

app.post('/signin', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }
  
const token = jwt.sign({
  username: username
}, JWT_SECRET);  // Generate a JWT token using the username and secret key
// Store the token in the user object

console.log("You are signed in successfully");  
console.log(users);
return res.status(200).json({ token: token });
  
});

app.post('/signup', (req, res) => {
  //input validations later
  const username = req.body.username;
  const password = req.body.password;
  
   if(users.find(user => user.username === username)) {
     return res.status(400).send('Username already exists');
   }

  users.push({
     username : username,
     password : password
     });
    res.status(200).send('User signed up successfully');
    console.log(users);
});

app.get('/me', (req, res) => {
  // Read token from 'authorization' header (e.g., Authorization: Bearer <token>)
  const authHeader = req.headers['authorization'];   //jwt 

  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const decodedToken = jwt.verify(token, JWT_SECRET); // get the decoded token using the secret key { "username": "user1" }
    const username = decodedToken.username; // Extract the username from the decoded token
  const Fuser = users.find(user => user.username === username);
  if (!Fuser) {
    return res.status(401).send('Unauthorized');
  }  
  res.status(200).json({ username: Fuser.username, password: Fuser.password });
});





// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}   );