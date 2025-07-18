import React, { useEffect, useRef } from "react";
import API from "../api";

const AddUserModal = ({ onClose, onUserAdded }) => {
  const nameRef = useRef();

  // Submission logic to create user
  const handleSubmit = async () => {
    const name = nameRef.current.value.trim();
    if (!name) return;

    try {
      const { data } = await API.post("/users", { name });
      onUserAdded?.(data);
      onClose();
      alert(data.message);
      nameRef.current.value = "";
    } catch (error) {
      console.log(error);
      alert("Error in adding user", error.message);
    }
  };

  //Background scrolling off logic
   useEffect(() => {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-60 flex items-center justify-center z-50 px-2 sm:px-0 overflow-x-hidden">
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-full  sm:max-w-md shadow-2xl box-border overflow-x-hidden">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Add New User
        </h2>
        <input
          type="text"
          placeholder="Enter user name"
          ref={nameRef}
          className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
