const express=require('express');
const authRoutes=express.Router();

const {registerUser, loginUser,verifyOTP}=require('../controllers/authController');

authRoutes.post('/register',registerUser);
authRoutes.post('/login',loginUser);
authRoutes.post('/verify-otp', verifyOTP);

module.exports=authRoutes;