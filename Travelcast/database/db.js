const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'travelcast',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'admin', // Change this to your actual password
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: "postgres",
        logging: false,
        port: process.env.DB_PORT || 5432,
    }
);

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully.");
        
        // Sync all models
        await sequelize.sync();
        console.log("Database synchronized.");
    }catch(error){
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
};

module.exports = {sequelize, connectDB};