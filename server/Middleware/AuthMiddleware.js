import jwt from "jsonwebtoken"
import { User } from "../Model/UserModel.js"

export const verify = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.json({success:false,message:"Token Not Found"})
        }

        const key = process.env.JWT_SECRET

        const decoded = await jwt.decode(token,key)
        if(!decoded){
            return res.json({success:false,message:"Token Invalid"})
        }

        const user = await User.findById({_id:decoded.id}).select('-password')
        if(!user){
            return res.json({ success: false, message: "User Not Found" });
        }

        req.user= user
        next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}