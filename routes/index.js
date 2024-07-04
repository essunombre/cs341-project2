const router = require("express").Router();
const vehicleRouter = require("./vehicles");
const userRouter = require("./users");

router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello world I am in routes");
});

router.use("/vehicles", vehicleRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
