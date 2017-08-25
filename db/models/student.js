'use strict';

var Sequelize = require('sequelize')
var db = require('../index.js')

module.exports = db.define('student', { //with more time I would have a more detailed name field that uses both a first and last name
  name: {
    type:Sequelize.STRING,
    allowNull: false
  },
  email: {
    type:Sequelize.STRING,
    allowNull: false,
    validate: {
        isEmail: true
    }
  }
})