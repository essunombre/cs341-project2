const router = require("express").Router();
const vehicleRouter = require("./vehicles");
const userRouter = require("./users");
const passport = require("passport");

router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello world I am in routes");
});

router.use("/vehicles", vehicleRouter);
router.use("/users", userRouter);

// adding the login route
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if(err) {return next(err);}
    res.redirect('/');
  });
});

module.exports = router;