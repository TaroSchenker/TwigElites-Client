import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("twiglets-id");
    localStorage.removeItem("twiglets-token");
  };
  return (
    <header className="w-100">
      <img src="./static/media/mascot.png" className="mascot" />
      <Link className="logout caveat" to="/registry" onClick={handleLogout}>
        Logout
      </Link>
    </header>
  );
};

export default Header;
