const db = require('../db')
const sequelize = require('sequelize')

module.exports = db.define('log', {

    description: {
        type: sequelize.STRING,
        allowNull: false
    },

    definition: {
        type: sequelize.STRING, 
        allowNull: false
    },

    result: {
        type: sequelize.STRING, 
        allowNull: false
    },

    owner_id: {
        type: sequelize.INTEGER
    }

})