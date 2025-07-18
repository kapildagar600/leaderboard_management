const User = require('../models/User');
const { userCreationSchema } = require('../validators/userValidation');
const { generateRandomPoints } = require('../utils/generateRandomPoints');

// To get all users 
exports.getAllUsers = async (req, res)=>{
    try {
        const users = await User.find().sort({totalPoints: -1});
        if(users.length===0){
            return res.status(404).json({message: "No users found in leaderboard"})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch users',error})
    }
}


//To create a user for leaderboard by giving name and total points in body
//we can have unique users but here i have not implemented
exports.createUser = async (req,res)=>{
    const result = userCreationSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message: "Validation failed",
            errors:result.error.issues.map(issue => ({
                field: issue.path?.[0],
                message: issue.message
            }))
        })
    }
    const {name,totalPoints,avatar} = result.data;
    const randomPoints = generateRandomPoints();

    try {
        const newUser = await User.create({
            name,
            totalPoints:0,
            avatar: `https://randomuser.me/api/portraits/men/${randomPoints}.jpg`
        })
        res.status(200).json({message:"User created Successfully",
            newUser
        })
        
    } catch (error) {
        res.status(400).json({message: 'Failed to create user',error})
    }
}


exports.deleteUser = async (req, res)=>{
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message: "User deleted successfully",user})
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
}