

import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import API from "../api";
import { Link } from "react-router-dom";

const Leaderboard = ({ refresh }) => {
  const [topThree, setTopThree] = useState([]);
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch top 3 and paginated users together
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await API.get(
          `/leaderboard?page=${currentPage}&limit=7`
        );
        setTopThree(response.data.topThree || []);
        setLeaderBoardData(response.data.others || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };
    fetchLeaderboard();
  }, [refresh, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 sm:mt-6">
      <div className="bg-blue-950 rounded-3xl sm:shadow-2xl px-2 py-6 sm:px-4 md:px-8 md:py-10 w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 md:mb-10 text-white tracking-tight">
          Leaderboard
        </h1>

        {/* Podium */}
        <div className="flex flex-row justify-center items-end mb-8 md:mb-10 gap-4 md:gap-8">
          
          {topThree[1] && (
            <Link to={`/user-history/${topThree[1]._id}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="bg-gradient-to-t from-gray-200 to-gray-50 rounded-full p-2 border-4 border-gray-300 w-24 h-24 flex items-center justify-center -mb-3">
                  <img
                    src={topThree[1].avatar}
                    alt={topThree[1].name}
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <span className="mt-2 font-semibold text-gray-200">
                  {topThree[1].name}
                </span>
                <span className="text-gray-200 text-sm">
                  {topThree[1].totalPoints} pts
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-full mt-1 text-gray-600 font-bold">
                  2
                </span>
              </div>
            </Link>
          )}
          {topThree[0] && (
            <Link to={`/user-history/${topThree[0]._id}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="relative bg-gradient-to-t from-yellow-200 to-yellow-50 rounded-full p-2 border-4 border-yellow-400 w-32 h-32 flex items-center justify-center">
                  <img
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                    className="w-28 h-28 rounded-full"
                  />
                  <FaCrown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 text-4xl drop-shadow-lg" />
                </div>
                <span className="mt-4 font-bold text-yellow-700 text-lg">
                  {topThree[0].name}
                </span>
                <span className="text-yellow-600 text-base">
                  {topThree[0].totalPoints} pts
                </span>
                <span className="bg-yellow-300 px-4 py-1 rounded-full mt-1 text-yellow-800 font-bold">
                  1
                </span>
              </div>
            </Link>
          )}
          {topThree[2] && (
            <Link to={`/user-history/${topThree[2]._id}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="bg-gradient-to-t from-orange-200 to-orange-50 rounded-full p-2 border-4 border-orange-300 w-20 h-20 flex items-center justify-center -mb-1">
                  <img
                    src={topThree[2].avatar}
                    alt={topThree[2].name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <span className="mt-2 font-semibold text-gray-200">
                  {topThree[2].name}
                </span>
                <span className="text-gray-200 text-sm">
                  {topThree[2].totalPoints} pts
                </span>
                <span className="bg-orange-200 px-3 py-1 rounded-full mt-1 text-orange-700 font-bold">
                  3
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Rest of the leaderboard */}
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <Link
              to={`/user-history/${user._id}`}
              key={user._id}
              className="block"
            >
              <div className="flex items-center justify-between px-6 py-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold w-6 text-center text-gray-700">
                    {user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                  <span className="font-semibold text-gray-700">
                    {user.name}
                  </span>
                </div>
                <span className="font-bold text-gray-600">
                  {user.totalPoints} pts
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
            }`}
          >
            Prev
          </button>
          <span className="text-white font-bold text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

