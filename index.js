const express = require('express');

const app = express();

app.use(express.json());

const users=[];

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
  
const token = generateToken(username);
// Store the token in the user object
user.token = token;
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


app.listen(3000, () => {
  console.log('Server is running on port 3000');
}   );