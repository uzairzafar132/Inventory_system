const jwt = require("jsonwebtoken");

function decodeToken(req, res, next) {
  // Extract the token from the request headers or query parameters or cookies, depending on your setup
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY); // Replace with your actual secret key

    // Attach the decoded token to the request object for future use
    req.decodedToken = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
}

module.exports = decodeToken;
