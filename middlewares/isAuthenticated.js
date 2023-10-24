const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next handler
  } else {
    res.status(401).send("Unauthorized"); // Send an unauthorized status if not authenticated
  }
};

module.exports = ensureAuthenticated;
