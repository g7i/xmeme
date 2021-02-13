const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const {setupDB} = require('./configs/sequelize');
const swagger = require('./swagger/swagger');

// PORT for API Backend
const PORT = process.env.PORT || 8081;

// Importing routes
const router = require('./routes');

// Initialize apps
const app = express();
const swaggerApp = express();

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// Setting up cors middleware
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://192.168.43.69:3000',
        'https://xmeme-front.netlify.app',
    ],
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Routes
app.use('/', router, swagger);
swaggerApp.use('/', swagger);

// Setting up the db
setupDB()
    .then(initiate)
    .catch(console.log)

// After the db connection listen to the requests
function initiate() {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

// serve Swagger-UI
swaggerApp.listen(8080, () => console.log(`Swagger UI running on port 8080`))
