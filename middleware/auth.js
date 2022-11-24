const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  // what if token is not available
  if (!token) {
    return res.status(403).send("Unauthorized User");
  }

  // Verify token
  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log(decode);
    req.user = decode;
  } catch (error) {
    res.status(402).send("Invalid Token");
  }
  next();
};

module.exports = auth;
