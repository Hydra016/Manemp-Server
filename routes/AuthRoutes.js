const passport = require("passport");
const { selectUserRole } = require("../controllers/AuthController");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ['profile', 'email']
    })
  );

  app.get(
    "/auth/google/employee",
    passport.authenticate("google-employee", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        if(req.user.role === 'business') {
          if (req.user.shopName) {
            res.redirect("http://localhost:3000");
          } else {
            res.redirect("http://localhost:3000/setup");
          }
        }
    }
  );

  app.get(
    "/auth/google/callback/employee",
    passport.authenticate("google-employee"),
    (req, res) => {
      if(req.user.role === 'employee') {
        res.redirect("http://localhost:3000")
      }
    }
  );

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      res.json({ data: req.user, isAuthenticated: true });
    } else {
      res.json({ data: {}, isAuthenticated: false });
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.status(200).json({ isAuthenticated: false });
  });

  app.post("/api/roleSelection", selectUserRole);
};
