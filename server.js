const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public')); // Assuming your HTML file is in a folder named 'public'

// Load users from a file (you need to implement this)
function loadUsers() {
  try {
    const data = fs.readFileSync('users.json'); // Assuming users are stored in this file
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

// Save users to a file (you need to implement this)
function saveUsers(users) {
  fs.writeFileSync('users.json', JSON.stringify(users));
}

// Route for serving the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Change 'index.html' to your HTML filename
});

// Registration route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users[username]) {
    // Account already exists
    res.json({ success: false, message: "Account already exists. Please try a different username." });
  } else {
    // Create a new user
    users[username] = password;
    saveUsers(users);
    // Account created successfully
    res.json({ success: true, message: "Account created successfully!" });
  }
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users[username] && users[username] === password) {
    // Successful login
    res.json({ success: true, message: `Welcome, ${username}!` });
  } else {
    // Failed login
    res.json({ success: false, message: "Invalid username or password." });
  }
});

// Start server
const PORT = process.env.PORT || 4000; // Use the new port here
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
