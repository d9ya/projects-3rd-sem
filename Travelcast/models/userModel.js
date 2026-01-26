const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const bcrypt = require("bcryptjs");


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value) {
        this.setDataValue("username", value.trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue("email", value.trim().toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      set(value) {
        this.setDataValue("fullName", value?.trim());
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    subscription: {
      type: DataTypes.JSON,
      defaultValue: {
        planId: null,
        startDate: null,
        status: 'inactive'
      }
    },
  },
  {
    tableName: "users",
    timestamps: true,
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['phoneNumber']
    //   }
    // ]
  }
);

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    const bcrypt = require('bcryptjs');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const bcrypt = require('bcryptjs');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});



// Instance method to compare password
User.prototype.comparePassword = async function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  
  // Check if password exists and is not undefined
  if (!this.password) {
    throw new Error('Password not found for user');
  }
  
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add unique constraint for phoneNumber after model definition
User.addHook('afterSync', async () => {
  try {
    await sequelize.queryInterface.addConstraint('users', {
      fields: ['phoneNumber'],
      type: 'unique',
      name: 'users_phone_number_unique'
    });
  } catch (error) {
    // Constraint might already exist, ignore error
    console.log('Phone number unique constraint already exists or error occurred');
  }
});

module.exports = User;