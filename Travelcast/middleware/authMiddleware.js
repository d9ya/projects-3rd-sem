const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user to request
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Token invalid" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token is required" });
  }
};

module.exports = protect;
