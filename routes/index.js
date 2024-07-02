const router = require("express").Router();
const vehicleRouter = require("./vehicles");
const userRouter = require("./users");


router.get('/', (req,res) => {
    res.send('Hello world I am in routes')
})

router.use("/vehicles", vehicleRouter);
router.use("/users", userRouter);

module.exports = {
    router,
} 
