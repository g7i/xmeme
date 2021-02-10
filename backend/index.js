const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const {setupDB} = require('./configs/sequelize');
const swagger = require('./swagger/swagger');

const PORT = process.env.PORT || 8081;

const router = require('./routes');

const app = express();
const swaggerApp = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:8080',],
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use('/', router);
swaggerApp.use('/', swagger);

setupDB()
    .then(initiate)
    .catch(console.log)

function initiate() {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

swaggerApp.listen(8080, () => console.log(`Swagger UI running on port 8080`))
