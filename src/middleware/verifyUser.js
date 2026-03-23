const verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }

  const uid = authHeader.replace("Bearer ", "").trim();

  if (!uid) {
    return res.status(401).json({ error: "No user UID provided" });
  }

  req.uid = uid;
  next();
};

module.exports = verifyUser;
