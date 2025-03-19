

require("dotenv").config();
const express = require("express");
const { resolve } = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const port = 3010;


app.use(express.json()); 
app.use(express.static("static")); 


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
   
});
const User = mongoose.model("User", userSchema);


app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;


    if (!username || !email || !password || !dob) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }


    const newUser = new User({ username, email, password, dob });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});