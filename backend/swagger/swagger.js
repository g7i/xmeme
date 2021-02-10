const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/swagger-ui', swaggerUi.serve);
router.get('/swagger-ui', swaggerUi.setup(swaggerDocument));

module.exports = router;