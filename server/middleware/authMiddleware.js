import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const { userId } = req.auth();
    console.log("userId:", userId)
    if(!userId){
        return res.json({success:false, message:'not authenticated'})
    }
    const user = await User.findById(userId);
    console.log("user found:", user)
    if(!user){
        return res.json({success:false, message:'user not found'})
    }
    req.user = user;
    next()
}