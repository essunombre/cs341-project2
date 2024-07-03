const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicles");

// router.get("/metro", (req, res) => {
//   res.send('I will be get all metro');
// });

router.get("/", vehicleController.getAll);

router.get("/:id", vehicleController.getById);
// Create
router.post("/", vehicleController.createVehicle);
// Update
router.put("/:id", vehicleController.updateVehicle);
// Deletion
router.delete("/:id", vehicleController.deleteVehicle);

//  I only need to export the router, the router has access to the routes
module.exports = router;
