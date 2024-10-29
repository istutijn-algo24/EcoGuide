const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory

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
const PORT = process.env.PORT || 4000; // Use the appropriate port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
