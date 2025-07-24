const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const isAdmin = require("../middleware/isAdmin");
const authMiddleware = require("../middleware/auth.middleware");

// ✅ Λήψη όλων των χρηστών (μόνο για Admins)
router.get("/", authMiddleware, isAdmin, userController.getAllUsers);

// ✅ Δημιουργία νέου χρήστη (Admin μόνο)
router.post("/", authMiddleware, isAdmin, userController.createUser);

// ✅ Ενημέρωση ρόλου χρήστη (Admin μόνο)
router.put("/:id/role", authMiddleware, isAdmin, userController.updateUserRole);

// ✅ Ενημέρωση email και/ή password χρήστη (Admin μόνο)
router.put("/:id", authMiddleware, isAdmin, userController.updateUserData);

// ✅ Διαγραφή χρήστη (Admin μόνο)
router.delete("/:id", authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
