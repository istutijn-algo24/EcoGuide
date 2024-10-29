const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve all static files directly from the root directory
app.use(express.static(__dirname));

// Load users from a file
function loadUsers() {
    try {
        const data = fs.readFileSync('users.json'); // Adjust the path if necessary
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

// Save users to a file
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Serve the main HTML file (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html
});

// Serve the login HTML file (login.html)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); // Serve login.html
});

// Serve the register HTML file (register.html)
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html')); // Serve register.html
});

// Define routes for other pages
app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'page1.html'));
});
app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'page2.html'));
});
app.get('/page3', (req, res) => {
    res.sendFile(path.join(__dirname, 'page3.html'));
});
app.get('/page4', (req, res) => {
    res.sendFile(path.join(__dirname, 'page4.html'));
});
app.get('/ecosort', (req, res) => {
    res.sendFile(path.join(__dirname, 'EcoSort.html'));
});

// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    if (users[username]) {
        res.json({ success: false, message: "Account already exists. Please try a different username." });
    } else {
        users[username] = password;
        saveUsers(users);
        res.json({ success: true, message: "Account created successfully!" });
    }
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    if (users[username] && users[username] === password) {
        res.json({ success: true, message: `Welcome, ${username}!` });
    } else {
        res.json({ success: false, message: "Invalid username or password." });
    }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
