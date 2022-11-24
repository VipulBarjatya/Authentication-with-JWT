require("./config/database.js").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// import model(user)
const User = require("./model/user");
const { urlencoded } = require("express");
const user = require("./model/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Auth System");
});

app.post("/register", async (req, res) => {
  try {
    // collect all information
    const { firstname, lastname, email, password } = req.body;
    // validate all data, if exists
    if (!(firstname && lastname && email && password)) {
      res.status(401).send("All fields are required");
    }
    // Check if user exist or not
    const exstUser = await User.findOne({ email: email });
    if (exstUser) {
      res.status(402).send("User already exist");
    }

    // encrypt the password
    const encrytedPass = await bcrypt.hash(password, 10);

    // Create a new entry in database
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: encrytedPass,
    });

    // Create a token and send it to database
    const token = jwt.sign(
      {
        id: newUser._id,
        email: email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );

    newUser.token = token;
    // don't want to send the password
    newUser.password = undefined;

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    // collecting information
    const { email, password } = req.body;
    // validate
    if (!(email && password)) {
      res.status(402).send("please fill correct credentials");
    }
    // check user in database
    const newUser = User.findOne({ email: email });
    // If user does not exist in database
    if (!newUser) {
      res.status(402).send("User not found in database");
    }
    // If user exist / match the password
    if (newUser && (await bcrypt.compare(password, newUser.password))) {
      const token = jwt.sign(
        {
          id: newUser.id,
          email: email,
        },
        "shhhhh",
        { expiresIn: "2h" }
      );
      newUser.password = undefined;
      newUser.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        newUser,
      });
    }

    // create token and send
  } catch (error) {}
});
