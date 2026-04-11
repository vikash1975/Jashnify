const User=require('../models/userModel');
const { sendOtpEmail } = require('../utils/email');
const OTP=require('../models/otpModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const generateToken=(id,role)=>{
return jwt.sign({id,role}, process.env.JWT_SECRET,{expiresIn:'7d'});
}


const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    let userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({error:'User already exists'});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    try {
        const user=await  User.create({name,email,password:hashedPassword,role:'user',isVerified:false});
        // await user.save();


        const otp=Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP for ${email}:${otp}`);
        await OTP.create({email,otp,action:'account_verification'});
        
        await sendOtpEmail(email,otp,'account_verification');

        res.status(201).json({message:"User register Successfully. Please check your email for OTP to verify your account.",
            email:user.email
        })
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}







// login


const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"Invalid Credentials"});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:"Invalid Credentials"});
    }

    if(!user.isVerified && user.role==="user"){
        const otp=Math.floor(100000 + Math.random()*900000).toString();
        await OTP.deleteMany({email,action:'account_verification'});
        await OTP.create({email,otp, action:'account_verification'});
        await sendOtpEmail(email,otp,'account_verification');

        return res.status(400).json({error:'Account not verified. A new OTP has been sent to your email'})
    }
    res.status(200).json({
        message:"Login Successfully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id, user.role)
        }
    })


}

    // verifyOTP

    const verifyOTP=async(req,res)=>{
         const {email,otp}=req.body;
         const otpRecord=await OTP.findOne({email,otp,action:'account_verification'});

         if(!otpRecord){
            return res.status(400).json({error:"Invalid or expired OTP"})
         }

         const user = await User.findOneAndUpdate(
          { email },
         { isVerified: true },
         { new: true }
);
         await OTP.deleteMany({email,action:'account_verification'});
         res.json(
            {message:'Account verified successfully. You can now log in.',
             _id:user._id,
             name:user.name,
             email:user.email,
             role:user.role,
             token:generateToken(user._id, user.role)

            })
    }



    module.exports={registerUser,loginUser,verifyOTP};