const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    occupation: {
      type: String,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
