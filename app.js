require("./config/database.js").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// import model(user)
const User = require("./model/user");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {});
