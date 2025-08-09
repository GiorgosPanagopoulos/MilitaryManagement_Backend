/**
 * @swagger
 * components:
 *   schemas:
 *     PersonnelDto:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - rank
 *         - service
 *       properties:
 *         firstName:
 *           type: string
 *           example: Νικόλαος
 *         lastName:
 *           type: string
 *           example: Παπαδόπουλος
 *         rank:
 *           type: string
 *           example: Σημαιοφόρος
 *         service:
 *           type: string
 *           example: Υπηρεσία Ναυτικού
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 */
class PersonnelDto {
  constructor({ firstName, lastName, rank, service, phone, email }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.rank = rank;
    this.service = service;
    this.phone = phone;
    this.email = email;
  }
}
module.exports = PersonnelDto;
