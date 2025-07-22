const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Ανάκτηση όλων των χρηστών
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "email role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Σφάλμα κατά την ανάκτηση χρηστών" });
  }
};

// Δημιουργία νέου χρήστη
exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Όλα τα πεδία είναι υποχρεωτικά" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Ο χρήστης υπάρχει ήδη" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Ο χρήστης δημιουργήθηκε επιτυχώς" });
  } catch (error) {
    console.error("ΣΦΑΛΜΑ ΚΑΤΑ ΤΗ ΔΗΜΙΟΥΡΓΙΑ ΧΡΗΣΤΗ:", error);
    res.status(500).json({ message: "Σφάλμα κατά τη δημιουργία χρήστη" });
  }
};

// Ενημέρωση ρόλου χρήστη
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: "email role" }
    );

    if (!user) {
      return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε" });
    }

    res.json({ message: "Ο ρόλος ενημερώθηκε", user });
  } catch (error) {
    res.status(500).json({ message: "Σφάλμα κατά την ενημέρωση ρόλου" });
  }
};

// Διαγραφή χρήστη
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε" });
    }

    res.json({ message: "Ο χρήστης διαγράφηκε" });
  } catch (error) {
    res.status(500).json({ message: "Σφάλμα κατά τη διαγραφή χρήστη" });
  }
};
