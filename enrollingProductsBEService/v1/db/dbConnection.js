/* ************************************************************
Author(s): Saheli
Sprint: Sprint 1
Created On: 6/2020
Modified by: 
Modified on: 
====================
Description: DB connection
************************************************************ */
const mariadb = require('mariadb');
const config = require('../config/config')
const fileOwner = 'dbConnection.js'
const { createLogs } = require('../logger/loggerMethod')

const pool = mariadb.createPool({
    user: config.connection.development.user,
    host: config.connection.development.host,
    database: config.connection.development.database,
    password: config.connection.development.password,
    port: 3307,
    connectionLimit: 5
});


(async function connect() {
    try {
        await pool.getConnection();
        createLogs('', '', 'DBConnection', fileOwner, 'DBConnection', 'DataBase Connected');
    }
    catch (err) {
        createLogs('', '', 'DBConnection', fileOwner, 'DBError', err);
    }
})();

module.exports = pool;