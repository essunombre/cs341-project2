const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip')

// router.get("/metro", (req, res) => {
//   res.send('I will be get all metro');
// });

router.get("/", tripController.getAll);

router.get('/:id', tripController.getById);

//  I only need to export the router, the router has access to the routes
module.exports = router;
