/**
 * @swagger
 * components:
 *   schemas:
 *     TrainingDto:
 *       type: object
 *       required:
 *         - description
 *         - location
 *         - from_date
 *         - to_date
 *       properties:
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         from_date:
 *           type: string
 *           format: date
 *         to_date:
 *           type: string
 *           format: date
 */
class TrainingDto {
  constructor({ description, location, from_date, to_date }) {
    this.description = description;
    this.location = location;
    this.from_date = from_date;
    this.to_date = to_date;
  }
}
module.exports = TrainingDto;
