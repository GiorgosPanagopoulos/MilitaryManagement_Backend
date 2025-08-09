/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */
class LoginUserDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}
module.exports = LoginUserDto;
