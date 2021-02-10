const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../configs/sequelize');

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
    modelName: 'Meme' // We need to choose the model name
});

module.exports = Meme;