import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// @description Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401)
    throw new Error ('Invalid email or password')
  }
});

// @description Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name,email, password } = req.body;

  const userExist = await User.findOne({ email });

  if(userExist){
    res.status(400)
    throw new Error('User already exist')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }else{
    res.status(400)
    throw new Error('Invalid User data')
  }
});


// @description user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }else{
    res.status(404)
    throw new Error('User not found')
  }
});


// @description update profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });

  }else{
    res.status(404)
    throw new Error('User not found')
  }
});


// @description Get all users 
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
});


// @description Delete 
// @route DELETE/api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    await user.deleteOne(); 
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @description Get user by ID 
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user){
    res.json(user)
  }else{
    throw new Error('User not found');
  }
});


// @description update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  // Find the user by the ID provided in the request parameters, not the logged-in user ID
  const user = await User.findById(req.params.id);

  if (user) {
    const emailExists = await User.findOne({ email: req.body.email });

    // Check if the email is already in use by another user
    if (emailExists && emailExists._id.toString() !== user._id.toString()) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Only update isAdmin if it's provided in the request
    if (typeof req.body.isAdmin !== 'undefined') {
      user.isAdmin = req.body.isAdmin;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser};
