import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import AddUserModal from "./components/AddUserModal";
import ListModal from "./components/ListModal";
import UserHistory from "./pages/UserHistory";

function App() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [userAdded, setUserAdded] = useState(false);

  const handleAddUserClick = () => setShowUserModal(true);
  const handleListClick = () => setShowListModal(true);
  const handleUserAdded = () => setUserAdded((prev) => !prev);
  return (
    <div className="bg-blue-950  md:bg-gradient-to-r from-[#020024] via-[#5757e6] to-[#00d4ff] min-h-screen py-6">
      <Navbar
        onAddUserClick={handleAddUserClick}
        onListClick={handleListClick}
      />
      <Routes>
        <Route path="/" element={<Leaderboard refresh={userAdded} />} />
        <Route path="/user-history/:id" element={<UserHistory />} />
      </Routes>

      {showUserModal && (
        <AddUserModal
          onClose={() => setShowUserModal(false)}
          onUserAdded={handleUserAdded}
        />
      )}
      {showListModal && (
        <ListModal
          onClose={() => setShowListModal(false)}
          fetchUsers={handleUserAdded}
        />
      )}
    </div>
  );
}

export default App;
