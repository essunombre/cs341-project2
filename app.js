// 5:59

// 1 I created the express and I listened to a port
// 2 I created routes
// 3 I use 'use' to call those routes
// 4 I use controllers to add the logic that the route will use.
// 5 I create a data folder for the DB, with the connecion on env file, project, we have a connection (db name on the connection string)
// 6 I made sure to have all routes on the index, not here, here I call the router.
// 7 I make sure I add the variable env on render.
// 8 I add the allow cross origin
// 9 se swagger file fo iunstructions
// 10 I add the uncaught exception
// g9sxQikwm5TAYpdM esnuestronombre

// 11 adding 0auth I install passport
// 12 to store the user object from github I need to install express-session
// 13 passport for githbu needs to be installed npm o passport-github2 (i call the strategy method)
// 14 add more to my app. I add use session
// 15 install cors and add to app
// 16 I add the passport 
// 17 I register the app on fgithub for 0Atuh to get the client id
// 18 now i add the object to serilize and deserialize the object
// 19 add the 2 endpoints of the session
// 20 add the middleware on autheticate to validate if there is a sesssion
//21 create routes for autehtication in routes index.
//  22 when deplooyoing I need to make sure the variables are updated and the 0auth is updated on github


const express = require("express");
const app = express();
const mongodb = require("./data/database");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");


const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/jose", (req, res) => {
//   res.send("Jose David Albancando Robles");
// });

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  // this is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to usee "express-session"
  // routes will work across sites
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, x-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  // Here I am calling:  app.use("/", mainRouter.router);
  .use("/", mainRouter);

// Here is the github access
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  // User.findOrCreate({ githubId: profile.id }, function(err, user){
  return done(null, profile)
  // }):
}))

passport.serializeUser((user, done) =>{
  done(null, user)
});
passport.deserializeUser((user, done) =>{
  done(null, user)
});


// endpoints of the session

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : 'Logged out') });
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api/docs', session: false}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});


// Exceptions to handle errors in my code, program wont stop but it continure running, like a catch all on a log
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DataBase Running at port: " + port);
  }
});

// Here I am making it to be listen
app.listen(port);
console.log("Web server is listening at port: " + port);
