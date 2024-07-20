const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
    
        if (!user) {
          res.status(404);
          throw new Error('User not found.');
        }
    
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
};

const createUser = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, age, dateOfBirth, occupation, mobileNo } = req.body;
    
        const userExists = await User.findOne({ email });
    
        if (userExists) {
          res.status(400);
          throw new Error('User already exists.');
        }
    
        const user = await User.create({
          firstname,
          lastname,
          email,
          password,
          age,
          dateOfBirth,
          occupation,
          mobileNo
        });
    
        if (user) {
          res.status(201).json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            age: user.age,
            dateOfBirth: user.dateOfBirth,
            occupation: user.occupation,
            mobileNo: user.mobileNo,
            token: generateToken(user._id)
          });
        } else {
          res.status(400);
          throw new Error('Error occurred!');
        }
      } catch (err) {
        next(err);
      }
};

const updateUser = async (req, res, next) => {
    const updates = Object.keys(req.body);

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
    
        if (!user) {
          res.status(404);
          throw new Error('User not found.');
        }
    
        res.status(200).json({ message: 'User deleted successfully.' });
      } catch (err) {
        next(err);
      }
};

module.exports = { deleteUser, updateUser, createUser, getUser, getUsers };
