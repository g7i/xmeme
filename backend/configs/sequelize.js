const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

exports.setupDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
}

exports.sequelize = sequelize;
