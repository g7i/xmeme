const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../configs/sequelize');

/**
 * Model definition for Meme
 */

class Meme extends Model {}

Meme.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Invalid URL format sent',
            },
        },
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Meme'
});

module.exports = Meme;