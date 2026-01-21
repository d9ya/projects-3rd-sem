const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, undefined]
    }
  },
  preferences: {
    type: DataTypes.JSON,
    defaultValue: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: "public",
        shareLocation: false
      },
      theme: "light",
      language: "en"
    }
  },
  security: {
    type: DataTypes.JSON,
    defaultValue: {
      twoFactorAuth: false,
      lastPasswordChange: new Date(),
      trustedDevices: ["Chrome on Windows", "iPhone Safari"]
    }
  }
});

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    // const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    // user.password = await bcrypt.hash(user.password, saltRounds);
    // For now, store password as plain text for testing
    console.log('Password would be hashed here in production');
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    // const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    // user.password = await bcrypt.hash(user.password, saltRounds);
    // For now, store password as plain text for testing
    console.log('Password would be hashed here in production');
  }
});

// Instance method to compare password
User.prototype.comparePassword = async function(candidatePassword) {
  // return await bcrypt.compare(candidatePassword, this.password);
  // For now, simple string comparison for testing
  return candidatePassword === this.password;
};

module.exports = User;