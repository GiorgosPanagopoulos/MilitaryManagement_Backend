const TrainingRecord = require('../../models/TrainingRecord');
const Personnel = require('../../models/Personnel');

// 📊 Προσωπικό ανά Μονάδα
exports.personnelByUnit = async (req, res) => {
  try {
    const result = await Personnel.aggregate([
      {
        $group: {
          _id: "$unit",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$count"
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error('personnelByUnit error:', err.message);
    res.status(500).json({ error: 'Σφάλμα προσωπικού ανά μονάδα' });
  }
};

// 📊 Προσωπικό ανά Βαθμό
exports.personnelByRank = async (req, res) => {
  try {
    const result = await Personnel.aggregate([
      {
        $group: {
          _id: '$rank',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: '$count'
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error('personnelByRank error:', err.message);
    res.status(500).json({ error: 'Σφάλμα προσωπικού ανά βαθμό' });
  }
};

// 📊 Συμμετοχές & Μ.Ο. βαθμολογίας εκπαίδευσης
exports.trainingParticipation = async (req, res) => {
  try {
    const result = await TrainingRecord.aggregate([
      {
        $group: {
          _id: '$description',
          participants: { $sum: 1 },
          avgScore: { $avg: '$grade' },
        },
      },
      {
        $project: {
          training: '$_id',
          participants: 1,
          averageScore: { $round: ['$avgScore', 1] },
          _id: 0,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error('trainingParticipation error:', err.message);
    res.status(500).json({ error: 'Σφάλμα στατιστικών εκπαιδεύσεων' });
  }
};

// 📈 Εκπαιδεύσεις ανά Μονάδα (μόνο αν υπάρχει `service` στο personnel)
exports.trainingsByUnit = async (req, res) => {
  try {
    const result = await Personnel.aggregate([
      {
        $lookup: {
          from: 'trainingrecords',
          localField: '_id',
          foreignField: 'personnel',
          as: 'records',
        },
      },
      {
        $group: {
          _id: '$unit',
          totalTrainings: { $sum: { $size: '$records' } },
        },
      },
      {
        $project: {
          _id: 0,
          unit: '$_id',
          totalTrainings: 1,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error('trainingsByUnit error:', err.message);
    res.status(500).json({ error: 'Σφάλμα στατιστικών ανά μονάδα' });
  }
};

// 📈 Ποσοστά επιτυχίας ανά Εκπαίδευση
exports.successRateByTraining = async (req, res) => {
  try {
    const result = await TrainingRecord.aggregate([
      {
        $group: {
          _id: '$description',
          total: { $sum: 1 },
          success: {
            $sum: {
              $cond: [{ $gte: ['$grade', 5] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          description: '$_id',
          successRate: {
            $cond: [
              { $eq: ['$total', 0] },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ['$success', '$total'] },
                      100,
                    ],
                  },
                  1,
                ],
              },
            ],
          },
          _id: 0,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error('successRateByTraining error:', err.message);
    res.status(500).json({ error: 'Σφάλμα ποσοστών επιτυχίας' });
  }
};

// 📌 Σύνολο Εκπαιδεύσεων ανά Περιγραφή
exports.totalTrainingsByDescription = async (req, res) => {
  try {
    const result = await TrainingRecord.aggregate([
      {
        $group: {
          _id: '$description',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          description: '$_id',
          count: 1
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error("totalTrainingsByDescription error:", err.message);
    res.status(500).json({ error: 'Σφάλμα καταμέτρησης εκπαιδεύσεων ανά περιγραφή' });
  }
};
