const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate')

router.get("/", userController.getAll);

router.get("/:id", isAuthenticated, userController.getById);
// Create
router.post("/", isAuthenticated, validation.saveUser, userController.createUser);
// Update
router.put("/:id", isAuthenticated, validation.saveUser, userController.updateUser);
// Delete
router.delete("/:id", isAuthenticated, userController.deleteUser)

module.exports = router;
