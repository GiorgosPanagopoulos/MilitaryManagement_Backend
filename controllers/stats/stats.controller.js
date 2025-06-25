const Training = require('../models/Training');
const Personnel = require('../models/Personnel');
const Service = require('../models/Service');

exports.trainingsByUnit = async (req, res) => {
  try {
    const result = await Service.aggregate([
      {
        $lookup: {
          from: 'personnels',
          localField: 'personnel',
          foreignField: '_id',
          as: 'staff'
        }
      },
      {
        $unwind: '$staff'
      },
      {
        $lookup: {
          from: 'trainingrecords',
          localField: 'staff._id',
          foreignField: 'personnel',
          as: 'records'
        }
      },
      {
        $project: {
          name: 1,
          totalTrainings: { $size: '$records' }
        }
      },
      {
        $group: {
          _id: '$name',
          totalTrainings: { $sum: '$totalTrainings' }
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Σφάλμα στατιστικών ανά μονάδα' });
  }
};

exports.successRateByTraining = async (req, res) => {
  try {
    const result = await Training.aggregate([
      {
        $lookup: {
          from: 'trainingrecords',
          localField: '_id',
          foreignField: 'training',
          as: 'records'
        }
      },
      {
        $project: {
          description: 1,
          total: { $size: '$records' },
          success: {
            $size: {
              $filter: {
                input: '$records',
                as: 'r',
                cond: { $gte: ['$$r.grade', 5] }
              }
            }
          }
        }
      },
      {
        $project: {
          description: 1,
          successRate: {
            $cond: [
              { $eq: ['$total', 0] },
              0,
              { $multiply: [{ $divide: ['$success', '$total'] }, 100] }
            ]
          }
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Σφάλμα ποσοστών επιτυχίας' });
  }
};