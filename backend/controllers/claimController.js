const History = require('../models/History');
const User = require('../models/User');
const { generateRandomPoints } = require('../utils/generateRandomPoints');
exports.claimPoints = async (req, res)=>{
    const userId = req.params.id;
    try {
        const randomPoints = generateRandomPoints() ;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$inc: {totalPoints: randomPoints}},
            {new:true}
        );
        if(!updatedUser){
            return res.status(404).json({message: 'User not found'})
        }

        await History.create({
            user: userId,
            pointsClaimed: randomPoints
        })

        const io = req.app.get('io');
        const allUsers = await User.find().sort({totalPoints: -1});
        io.emit('leaderboardUpdated', allUsers); // send full updated leaderboard

        res.status(200).json({
            message: `Successfully claimed ${randomPoints} points!`,
            user: updatedUser
        })
    } catch (error) {
        console.error("Claim points error",error)
        res.status(500).json({ message: 'Error claiming points', error });
    } 
};

exports.getuserHistory = async (req, res)=>{
    const userId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1) * limit;
    try {
        const total = await History.countDocuments({user: userId})

        const history = await History.find({user: userId})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email')
        .select('-__v')
        .select('pointsClaimed createdAt user')

        if(!history || history.length===0){
            return res.status(404).json({message: "No claim history found"})
        }

        res.status(200).json({message: "User claim history fetched successfully",
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalEntries: total,
            history
        })
    } catch (error) {
        console.error("Error fetching user history:",error);
        res.status(500).json({message:"Failed to fetch user history",error});
    }
}