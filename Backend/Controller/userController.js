import User from "../Models/userModel.js"

export const getCurrentUser=async(req, res)=>{
    try {
        let id=req.userId
        const user=await User.findById(id).select("-password")
        if(!user){
          return res.status(400).json({message: "User does not found"})
        }
        return res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Get current user error"})
    }
}