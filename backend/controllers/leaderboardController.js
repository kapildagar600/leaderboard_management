const User = require('../models/User');

// controller/leaderboard.js
exports.getLeaderboard = async (req, res) => {
  try {
    const { page = 1, limit = 7 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find().sort({ totalPoints: -1 }).select("-__v");

    const topThree = users.slice(0, 3).map((user, index) => ({
      rank: index + 1,
      ...user.toObject(),
    }));

    const others = users.slice(3);
    const paginated = others.slice(skip, skip + parseInt(limit));

    const paginatedRanked = paginated.map((user, index) => ({
      rank: skip + index + 4, // rank starts after top 3
      ...user.toObject(),
    }));

    const totalPages = Math.ceil(others.length / limit);

    res.status(200).json({
      message: "Leaderboard fetched",
      topThree,
      others: paginatedRanked,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard", error });
  }
};

