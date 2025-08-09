/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *         role:
 *           type: string
 *           enum: [admin, user]
 *         name:
 *           type: string
 */
class UpdateUserDto {
  constructor({ email, password, role, name }) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
  }
}
module.exports = UpdateUserDto;
