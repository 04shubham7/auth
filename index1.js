const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const users = [];

app.post('/signin', (req, res) => { 
const username = req.body.username;
const password = req.body.password;
const fuser= users.find(user => user.username === username && user.password === password);
if (!fuser) {
    return res.status(401).json({ message: 'Invalid username or password' });
}
const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
res.json({ token });
});
app.post('/signup', (req, res) => { 
const username = req.body.username;
const password = req.body.password;
users.push({ username, password });
res.json({ message: 'User signed up successfully' });
});

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded; // Attach the decoded token to the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

app.get('/me', auth, (req, res) => {
    const user = users.find(u => u.username === req.user.username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username, password: user.password });
});



app.get('/todo', auth, (req, res) => {

});

app.post('/todo', auth, (req, res) => {

});

app.delete('/todo', auth, (req, res) => {

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});