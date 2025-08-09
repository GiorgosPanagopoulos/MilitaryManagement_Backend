/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenDto:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 */
class RefreshTokenDto {
  constructor({ refreshToken }) {
    this.refreshToken = refreshToken;
  }
}
module.exports = RefreshTokenDto;
