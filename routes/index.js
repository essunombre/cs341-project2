const router = require("express").Router();
const vehicleRouter = require("./vehicles");
const userRouter = require("./users");
const loginRouter = require("./login")
const logoutRouter = require("./logout")
const passport = require("passport");

router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello world I am in routes");
});

router.use("/vehicles", vehicleRouter);
router.use("/users", userRouter);

// adding the login route
router.get('/login', loginRouter);
router.get('/logout', logoutRouter);

module.exports = router;