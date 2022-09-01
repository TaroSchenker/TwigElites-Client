import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("twiglets-token");

  const handleLogout = () => {
    localStorage.removeItem("twiglets-id");
    localStorage.removeItem("twiglets-token");
  };

  console.log("*********~", token); // false

  useEffect(() => {}, [token]);
  return (
    <header className="w-100">
      <img src="./static/media/mascot.png" className="mascot" />
      <Link
        className="logout caveat"
        to={token == undefined ? "/login" : "/login"}
        onClick={handleLogout}
      >
        {token == undefined ? "Login" : "Logout"}
      </Link>
    </header>
  );
};

export default Header;
