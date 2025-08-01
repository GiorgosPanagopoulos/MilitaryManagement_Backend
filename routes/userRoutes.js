const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const isAdmin = require("../middleware/isAdmin");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         name:
 *           type: string
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         name:
 *           type: string
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Χρήστες
 *     description: Διαχείριση χρηστών (Admin)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Λήψη όλων των χρηστών
 *     tags: [Χρήστες]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Λίστα χρηστών
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", authMiddleware, isAdmin, userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Δημιουργία νέου χρήστη
 *     tags: [Χρήστες]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: Ο χρήστης δημιουργήθηκε
 */
router.post("/", authMiddleware, isAdmin, userController.createUser);

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Ενημέρωση ρόλου χρήστη
 *     tags: [Χρήστες]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Το ID του χρήστη
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: Ο ρόλος ενημερώθηκε
 */
router.put("/:id/role", authMiddleware, isAdmin, userController.updateUserRole);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Ενημέρωση email και/ή password χρήστη
 *     tags: [Χρήστες]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Το ID του χρήστη
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: Ο χρήστης ενημερώθηκε
 */
router.put("/:id", authMiddleware, isAdmin, userController.updateUserData);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Διαγραφή χρήστη
 *     tags: [Χρήστες]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Το ID του χρήστη
 *     responses:
 *       200:
 *         description: Ο χρήστης διαγράφηκε
 */
router.delete("/:id", authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
