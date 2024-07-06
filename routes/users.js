const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const validation = require('../middleware/validate')

router.get("/", userController.getAll);

router.get("/:id", userController.getById);
// Create
router.post("/", validation.saveUser, userController.createUser);
// Update
router.put("/:id", validation.saveUser, userController.updateUser);
// Delete
router.delete("/:id", userController.deleteUser)

module.exports = router;
