const express = require("express");
const mongoose = require("mongoose");
const employeeRoute = require("./routes/EmployeeRoutes");
const shiftRoute = require("./routes/ShiftRoutes");
const shopRoutes = require("./routes/ShopRoutes");
const userRoutes = require("./routes/UserRoutes");
const requestRoutes = require("./routes/RequestRoutes");
const scheduleRoutes = require("./routes/ScheduleRoutes");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const User = require("./models/User");
const cookieSession = require("cookie-session");
require('./services/passport');
const session = require('express-session');

const app = express();

const http = require('http').Server(app)
const io = require('socket.io')(http);

app.use(express.json());

mongoose.connect(process.env.DB_STRING_DEV);

app.use(
  session({
    secret: 'asdasdasdasd',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  })
);

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

require("./routes/AuthRoutes")(app);
app.use("/api", [shiftRoute, employeeRoute, shopRoutes, userRoutes, requestRoutes, scheduleRoutes]);

const PORT = 5000;

io.on('connection', function(socket) {
  console.log('user connected!')
})

http.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
