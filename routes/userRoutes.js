const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const isAdmin = require("../middleware/isAdmin");
const authMiddleware = require("../middleware/auth.middleware");

// Λήψη όλων των χρηστών (admin μόνο)
router.get("/", authMiddleware, isAdmin, userController.getAllUsers);

// Δημιουργία νέου χρήστη (admin μόνο)
router.post("/", authMiddleware, isAdmin, userController.createUser);

// Αλλαγή ρόλου χρήστη (admin μόνο)
router.put("/:id/role", authMiddleware, isAdmin, userController.updateUserRole);

// Διαγραφή χρήστη (admin μόνο)
router.delete("/:id", authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
