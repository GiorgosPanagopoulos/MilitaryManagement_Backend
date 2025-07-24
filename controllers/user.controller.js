const User = require("../models/User");
const bcrypt = require("bcryptjs");

const PROTECTED_EMAIL = "admin@milman.local";

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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε" });
    }

    if (user.email === PROTECTED_EMAIL) {
      return res
        .status(403)
        .json({ message: "Δεν μπορείτε να αλλάξετε ρόλο του προστατευμένου διαχειριστή" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Ο ρόλος ενημερώθηκε", user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Σφάλμα κατά την ενημέρωση ρόλου" });
  }
};

// Διαγραφή χρήστη
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε" });
    }

    if (user.email === PROTECTED_EMAIL) {
      return res
        .status(403)
        .json({ message: "Δεν μπορείτε να διαγράψετε τον προστατευμένο διαχειριστή" });
    }

    await user.deleteOne();
    res.json({ message: "Ο χρήστης διαγράφηκε" });
  } catch (error) {
    res.status(500).json({ message: "Σφάλμα κατά τη διαγραφή χρήστη" });
  }
};

// ✅ Ενημέρωση email και/ή password χρήστη (Admin)
exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Ο χρήστης δεν βρέθηκε" });
    }

    if (user.email === PROTECTED_EMAIL) {
      return res
        .status(403)
        .json({ message: "Δεν μπορείτε να τροποποιήσετε τον προστατευμένο διαχειριστή" });
    }

    if (email) {
      const existing = await User.findOne({ email });
      if (existing && existing._id.toString() !== id) {
        return res.status(409).json({ message: "Το email χρησιμοποιείται ήδη από άλλον χρήστη" });
      }
      user.email = email;
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.json({
      message: "Ο χρήστης ενημερώθηκε",
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Σφάλμα στην ενημέρωση χρήστη:", error);
    res.status(500).json({ message: "Σφάλμα κατά την ενημέρωση χρήστη" });
  }
};
