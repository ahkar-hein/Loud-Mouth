import React from "react";
import Auth from "../../utils/auth";

const LogoutButton = () => {
  const handleLogout = () => {
    // Call logout function from auth utility
    Auth.logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
