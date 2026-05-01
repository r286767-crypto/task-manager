const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied: Admin only");
    }

    next();
  } catch (err) {
    res.status(500).json("Error");
  }
};

module.exports = adminMiddleware;