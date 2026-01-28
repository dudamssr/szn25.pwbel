const jsonwebtoken = require("jsonwebtoken");

const validate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT);
    
    console.log("Payload do token:", payload);

    req.user = payload; 

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = validate;
