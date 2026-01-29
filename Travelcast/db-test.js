const { sequelize } = require('./database/database');

async function testConnection() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Check if the users table exists
    const queryInterface = sequelize.getQueryInterface();
    const tables = await sequelize.showAllSchemas();
    console.log('Tables in database:', tables);
    
    // Try to sync the model again with logging enabled
    const User = require('./models/userModel');
    
    // Check if the users table exists specifically
    const [results] = await sequelize.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users');"
    );
    console.log('Users table exists:', results[0].exists);
    
    // If table doesn't exist, create it
    if (!results[0].exists) {
      console.log('Creating users table...');
      await User.sync({ force: false });
      console.log('Users table created.');
    }
    
    // Check if any users exist
    const usersCount = await User.count();
    console.log('Number of users in database:', usersCount);
    
    // Fetch all users
    const users = await User.findAll();
    console.log('Users in database:', users.map(u => ({ id: u.id, username: u.username, email: u.email })));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();