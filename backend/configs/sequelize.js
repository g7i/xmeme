/**
 * Database helper for rw operations
 */

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

/**
 * @return {Promise<void>}
 */
exports.setupDB = async () => {
    await sequelize.authenticate();
    // await sequelize.sync();
    await sequelize.sync({force: true});
}

/**
 * Exporting the instance
 * @type {Sequelize}
 */
exports.sequelize = sequelize;