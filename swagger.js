const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Military Management API',
      version: '1.0.0',
      description: 'API τεκμηρίωση για την εφαρμογή MilitaryManagement',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
        description: 'Τοπικός server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {}, // ✅ Υποχρεωτικό block για αποφυγή error (ακόμη κι αν γεμίζει από τα JSDoc)
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js', './dtos/*.js'], // ✅ Συμπεριλαμβάνει και dtos
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
