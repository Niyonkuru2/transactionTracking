import validator from "validator";
import userModel from "../models/userModel.js"
import bcrypt from'bcrypt'
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_TOKEN)
}
//Controller for user register
const registerUser = async(req,res)=>{
 
    try {
      const {name,email,password} = req.body;
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
       const isVarid = validator.matches(password,specialChars);
      
       //check if user already exists or not
      
      const exists = await userModel.findOne({email});
         if(exists){
            return res.json({success:false,message:"User already exists"})
         }
         // validating email format and strong password

         if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
         }
         if(password.length < 8 ){
            return res.json({success:false,message:"Please enter a strong password"});
         }
         if(!isVarid){
            return res.json({success:false,message:"Include special characters in your password"})
           }
  //hashing password
 const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt)
   const newUser = new userModel({
    name,
    email,
    password:hashedPassword
   })
const user = await newUser.save()
return res.json({success:true,message:"User created",user})

} catch (error) {
    console.log(error);
    return res.json({success:false,message:error.message})    
    }
}

//Controller for user login
const loginUser = async(req,res)=>{
    try {
const {email,password} = req.body;

const user = await userModel.findOne({email});

if(!user){
    return res.json({success:false,message:"user doesn't exists"})   
 }
 const isMatch = await bcrypt.compare(password,user.password);

 if(isMatch){
    const token = createToken(user._id);
    return res.json({success:true,token})
 }
 else{
    return res.json({success:false,message:"Incorrect Password"});
 }

} catch (error) {
  return res.json({success:false,message:error.message})      
}
}

//Controller to reset password
const requestresetPassword = async(req,res)=>{
    const {email} = req.body;
    try {
      const user = await userModel.findOne({email});
      if(!user) {
        return res.json({success:false,message:'User not found'});
      }
        const token = createToken(user._id);
        const resetLink = `https://transactiontracking-frontend.onrender.com/reset-password/${token}`;
       //sending email with the reset link
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
        const mailOptions={
            from:process.env.EMAIL,
            to:email,
            subject:'Password Reset',
            html: `
                <p>You requested to reset your password. Click the link below to reset it:</p>
                <a href="${resetLink}" target="_blank">${resetLink}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        return res.json({
            success:true,
            message:'Password reset link sent'
        });
      
    } catch (error) {
        return res.json({
            success:false, 
            message:error.message
        })     
    }
};

//controller to reset password
const resetPassword = async(req,res)=>{
    const{token}=req.params;
    const {newPassword} = req.body;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const isVarid = validator.matches(newPassword,specialChars);
    try {
      const decoded = jwt.verify(token,process.env.JWT_TOKEN) 
      const user =  await userModel.findById(decoded.userId);
      if(!user) {
        return res.json({success:false,message:"User not found"});
      }
      if(newPassword.length <= 8){
        return res.json({success:false,message:"Your password must be greater than 8 characters"})
       }
       if(!isVarid){
        return res.json({success:false,message:"Include special characters in your password"})
       }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword,salt);
      await user.save();
      return res.send({message:'Password Updated successfull',success:true});
    } catch (error) {
       return res.send({message:'Imvalid or Exipired token',success:false})
    }
}

export {registerUser,loginUser,requestresetPassword,resetPassword}
