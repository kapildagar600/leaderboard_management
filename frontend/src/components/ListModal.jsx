import React, { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import API from "../api";

const ListModal = ({ onClose, fetchUsers }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  //Logic to fetch top 10 users
  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await API.get("/users");
        const sortedTop10 = res.data
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .slice(0, 10);
        setUsers(sortedTop10);
        if (sortedTop10.length > 0) {
          setSelectedUserId(sortedTop10[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch top 10 users:", error);
      }
    };
    fetchTopUsers();
  }, []);

  //logic when claim button is clicked
  const handleClaimPoints = async () => {
    if (!selectedUserId) return;
    try {
      const response = await API.post(`/claim/${selectedUserId}`);
      alert(response.data.message, " Points claimed successfully!");
      fetchUsers?.();
      onClose();
    } catch (error) {
      alert("Failed to claim points");
      console.error(error.response?.data || error.message);
    }
  };

  //resist background from scrolling
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-2xl flex items-center justify-center z-50 px-2 sm:px-0 overflow-x-hidden">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md  text-black shadow-xl relative box-border overflow-x-hidden">
        <h2 className="text-xl font-semibold mb-4 text-center">Top 10 Users</h2>

        <UserDropdown
          users={users}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />

        <div className="flex flex-col sm:flex-row  justify-end gap-2 sm:gap-3 mt-4">
          <button
            onClick={handleClaimPoints}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Claim
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
