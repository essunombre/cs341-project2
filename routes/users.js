const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate')

router.get("/", isAuthenticated, userController.getAll);

router.get("/:id", userController.getById);
// Create
router.post("/", validation.saveUser, userController.createUser);
// Update
router.put("/:id", validation.saveUser, userController.updateUser);
// Delete
router.delete("/:id", userController.deleteUser)

module.exports = router;
