const express = require('express');
const app = express();
const port = 3500;

app.use(express.json());

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username) return res.status(400).json({ error: "Username cannot be empty" });
    if (!email) return res.status(400).json({ error: "Email cannot be empty" });
    if (!password || password.length < 8 || password.length > 16) {
        return res.status(400).json({ error: "Password length should be greater than 8 or less than or equal to 16" });
    }
    if (!dob) return res.status(400).json({ error: "Date of Birth cannot be empty" });

    res.status(201).json({ message: "User registered successfully" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});