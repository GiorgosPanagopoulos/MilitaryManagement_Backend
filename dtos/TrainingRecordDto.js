/**
 * @swagger
 * components:
 *   schemas:
 *     TrainingRecordDto:
 *       type: object
 *       required:
 *         - trainingId
 *         - personnelId
 *         - success_rate
 *       properties:
 *         trainingId:
 *           type: string
 *         personnelId:
 *           type: string
 *         success_rate:
 *           type: number
 *           format: float
 */
class TrainingRecordDto {
  constructor({ trainingId, personnelId, success_rate }) {
    this.trainingId = trainingId;
    this.personnelId = personnelId;
    this.success_rate = success_rate;
  }
}
module.exports = TrainingRecordDto;
