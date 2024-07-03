const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/", userController.getAll);

router.get("/:id", userController.getById);
// Create
router.post("/", userController.createUser);
// Update
router.put("/:id", userController.updateUser);
// Delete
router.delete("/:id", userController.deleteUser)

module.exports = router;
