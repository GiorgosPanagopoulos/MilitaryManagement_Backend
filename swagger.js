const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Ρυθμίσεις Swagger
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
      schemas: {},
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Συμπεριλαμβάνει όλα τα routes, models, dtos
  apis: [
    path.join(__dirname, './routes/*.js'),
    path.join(__dirname, './models/*.js'),
    path.join(__dirname, './dtos/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger docs διαθέσιμα στο: http://localhost:5001/api-docs');
};
