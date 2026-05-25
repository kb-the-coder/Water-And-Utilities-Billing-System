import { User } from "../Model/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const emailExist = await User.findOne({email})

        if(emailExist){
            return res.json({success:false,message:"Email Already Exist"})
        }

        const hashPass = await bcrypt.hash(password,10)

       const user= await User.create({
          name,
          email,
          password:hashPass,
        });
        const key =process.env.JWT_SECRET
        const token = await jwt.sign({id:user._id},key,{expiresIn:"7d"})
        return res.json({success:true,message:"Account Created Successfull",token})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} =  req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"Email Not Exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Password Invalid"})
        }

           const key = process.env.JWT_SECRET;
           const token = await jwt.sign({ id: user._id }, key, {
             expiresIn: "7d",
           });
           return res.json({
             success: true,
             message: "Login Successfull",
             user,
             token,
           });
    } catch (error) {
          res.json({ success: false, message: error.message });
    }
}


export const verifyUser = async(req,res)=>{
    try {
        const user = req.user
        if(!user){
            res.json({success:false,message:"User Not Authorized"})
        }

        return res.json({success:true,user})
    } catch (error) {
          res.json({ success: false, message: error.message });
    }
}