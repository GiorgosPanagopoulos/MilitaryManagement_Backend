require("dotenv").config();
const mongoose = require("mongoose");
const TrainingRecord = require("../models/TrainingRecord");

const trainings = [
  {
    description: "Βασική Εκπαίδευση",
    location: "Σχολή Ναυτικών Δοκίμων",
    from_date: new Date("2024-01-10"),
    to_date: new Date("2024-01-20"),
    personnel: [],
  },
  {
    description: "Εξειδίκευση Radar",
    location: "Κέντρο Εκπαίδευσης Ηλεκτρονικών",
    from_date: new Date("2024-03-01"),
    to_date: new Date("2024-03-10"),
    personnel: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    await TrainingRecord.deleteMany();
    await TrainingRecord.insertMany(trainings);

    console.log("✅ Training records inserted");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seed();
