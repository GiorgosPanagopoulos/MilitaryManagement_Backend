const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Military Management API',
      version: '1.0.0',
      description: 'API τεκμηρίωση για την εφαρμογή MilitaryManagement'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Τοπικός server'
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js'], // διαδρομές όπου ορίζονται τα endpoints με Swagger JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};