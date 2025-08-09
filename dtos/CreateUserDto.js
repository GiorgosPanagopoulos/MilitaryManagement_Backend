/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@milman.local
 *         password:
 *           type: string
 *           minLength: 6
 *           example: Secret123!
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 *         name:
 *           type: string
 *           example: Γεώργιος Παναγόπουλος
 */
class CreateUserDto {
  constructor({ email, password, role, name }) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
  }
}
module.exports = CreateUserDto;
