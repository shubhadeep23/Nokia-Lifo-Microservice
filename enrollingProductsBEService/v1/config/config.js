require('dotenv').config()

module.exports = {
    //DB connection details
    connection: {
        development: {
            host: process.env.DB_DEV_HOST,
            user: process.env.DB_DEV_USER,
            password: process.env.DB_DEV_PASSWORD,
            database: process.env.DB_DEV_NAME,
        }
    }
}