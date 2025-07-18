import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const UserHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //fetching the history of individual user
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await API.get(
          `/claim/history/${id}?page=${currentPage}&limit=10`
        );
        setHistory(res.data.history || []);
        setTotalPages(res.data.totalPages || 1);
        if (res.data.history && res.data.history[0]?.user) {
          setUser(res.data.history[0].user);
        }
      } catch (err) {
        console.log("error in history", err);
        setHistory([]);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [id, currentPage]);

  //page logic
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-6 px-2 sm:px-0 sm:bg-gradient-to-r from-[#020024] via-[#5757e6] to-[#00d4ff]">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline "
        >
          &larr; Back
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Claim History</h2>
        <div className="mb-6 text-center">
          <div className="font-semibold text-lg sm:text-xl">{user.name}</div>
          <div className="text-gray-500 text-sm">{user.email}</div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : history.length === 0 ? (
          <div>No claim history found.</div>
        ) : (
          <>
            <ul className="divide-y">
              {history.map((item, idx) => (
                <li
                  key={item._id || idx}
                  className="py-2 sm:py-3 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0"
                >
                  <span>+{item.pointsClaimed} points</span>
                  <span className="text-gray-500 text-sm">
                    {item.claimedAt}
                  </span>
                </li>
              ))}
            </ul>
            {/* pagination controls */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-6">
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
              <span className="text-gray-700 font-bold text-lg">
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
