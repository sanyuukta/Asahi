const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminProtect = require("../middleware/adminMiddleware");

router.post("/login", adminController.adminLogin);

router.get("/dashboard", adminProtect, adminController.dashboard);
router.get("/users", adminProtect, adminController.getAllUsers);

router.delete("/delete-user/:id", adminProtect, adminController.deleteUser);

module.exports = router;