import React from "react";

const LogoutButton = () => {
  const url = "http://localhost:3000/";
  const redirectToHome = () => {
    window.location.href = url;
  };
  return (
    <button
      className="btn"
      style={{ margin: "5px", padding: "5px" }}
      onClick={() => redirectToHome()}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
