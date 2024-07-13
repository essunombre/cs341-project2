const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicles");
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate')


// router.get("/metro", (req, res) => {
//   res.send('I will be get all metro');
// });

router.get("/", vehicleController.getAll);

router.get("/:id",  isAuthenticated, vehicleController.getById);
// Create
router.post("/",  isAuthenticated, validation.saveVehicle, vehicleController.createVehicle);
// Update
router.put("/:id",  isAuthenticated, validation.saveVehicle, vehicleController.updateVehicle);
// Deletion
router.delete("/:id",  isAuthenticated, vehicleController.deleteVehicle);

//  I only need to export the router, the router has access to the routes
module.exports = router;
